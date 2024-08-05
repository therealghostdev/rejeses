"use client";
import { ClientPageProps } from "@/utils/types/types";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  FormDataTYpe,
  OrderResponse,
  TransactionResponseType,
} from "@/utils/types/types";
import { usePayment, useNavigation } from "@/utils/context/payment";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import PaystackPop from "@paystack/inline-js";
import { useMutation } from "@tanstack/react-query";
import Loading from "@/app/feed/loading";
import { TransactionDataType } from "@/utils/types/types";
import Transaction_success from "./checkout_components/transaction_success";
import Transaction_failed from "./checkout_components/transaction_failed";

export default function Checkout({ pricingItem }: ClientPageProps) {
  const [generalPrice, setGeneralPrice] = useState<number>(0);
  const { paymentInfo } = usePayment();
  const [transactionResponse, setTransactionResponse] =
    useState<TransactionResponseType>({
      data: { authorization_url: "", access_code: "", reference: "" },
    });

  const POLLING_INTERVAL = 5000;
  const MAX_POLLING_ATTEMPTS = 60;

  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [pollingAttempts, setPollingAttempts] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [transactionReference, setTransactionReference] = useState<string>("");
  const [dataValue, setDataValue] = useState<TransactionDataType>({
    id: 0,
    txid: "",
    orderRef: 0,
    pid: "",
    reference: "",
    status: "",
    accessCode: "",
    currency: "",
    fee: 0,
    updatedAt: "",
    createdAt: "",
  });

  const { isNigeria } = useNavigation();

  const pathname = usePathname();
  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  const [formData, setFormData] = useState<FormDataTYpe>({
    firstName: "",
    lastName: "",
    email: "",
    currency: isNigeria ? "NGN" : "USD",
  });

  const popup = useMemo(() => new PaystackPop(), []);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createOrder = async (
    formData: FormDataTYpe
  ): Promise<OrderResponse | null> => {
    try {
      const orderBodyParam = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        courseType: paymentInfo.training_type,
        startDate: paymentInfo.start_date,
        email: formData.email,
        amount: paymentInfo.price !== 0 ? paymentInfo.price : 100,
        currency: formData.currency,
      };

      const response = await axios.post<OrderResponse>(
        "/api/order",
        JSON.stringify(orderBodyParam)
      );

      return response.data;
    } catch (err) {
      console.error("Something went wrong creating order", err);
      return null;
    }
  };

  const createTransaction = async (formData: FormDataTYpe) => {
    try {
      const order = await createOrder(formData);

      if (!order) {
        throw new Error("Failed to create order");
      }

      const transactionBodyParam = {
        ref: Number(order.data),
        pid: "incoming",
        currency: formData.currency,
        _fee: Number(0),
      };

      const transactionResponse = await axios.post(
        "/api/transaction",
        JSON.stringify(transactionBodyParam)
      );

      setTransactionResponse(transactionResponse.data.data);
      return transactionResponse.data;
    } catch (err) {
      console.error("Something went wrong creating transaction", err);
      throw err;
    }
  };

  const mutation = useMutation({
    mutationFn: createTransaction,
    onError: (error) => {
      console.error("Something went wrong!", error);
    },

    onSuccess: (data) => {
      setTransactionResponse(data.data);
      setIsPolling(true);
    },
  });

  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        formData.lastName !== "" &&
        formData.firstName !== "" &&
        emailRegex.test(formData.email)
      ) {
        mutation.mutate(formData);
      }
    } catch (err) {
      console.error("Something went wrong!", err);
    }
  };

  const continueTransaction = async () => {
    try {
      if (
        transactionResponse.data.access_code !== "" &&
        transactionResponse.data.authorization_url !== "" &&
        transactionResponse.data.reference !== ""
      ) {
        popup.resumeTransaction(transactionResponse.data.access_code);

        clearValues();
      }
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const clearValues = () => {
    setFormData((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      email: "",
      currency: "",
    }));
  };

  useEffect(() => {
    if (transactionResponse.data.reference !== "") {
      continueTransaction();
    }
  }, [transactionResponse]);

  useEffect(() => {
    if (!isPolling) return;

    setTransactionReference(transactionResponse.data.reference);

    const pollTransactionStatus = async () => {
      try {
        const response = await axios.get(
          `/api/get_status?reference=${transactionResponse.data.reference}`
        );
        const { status, data } = response.data;

        if (status === 200 && data.status === "completed") {
          console.log(data);

          setDataValue(data);
          setIsPolling(false);
          setTransactionStatus("completed");
        } else if (status === 200 && data.status === "failed") {
          setIsPolling(false);
          setTransactionStatus("failed");
        } else {
          setPollingAttempts((prev) => prev + 1);
          if (pollingAttempts >= MAX_POLLING_ATTEMPTS) {
            setIsPolling(false);
            alert(
              "Transaction status check timed out. Please contact support."
            );
          }
        }
      } catch (error) {
        console.error("Error polling transaction status", error);
        setPollingAttempts((prev) => prev + 1);
        if (pollingAttempts >= MAX_POLLING_ATTEMPTS) {
          setIsPolling(false);
          alert("Error checking transaction status. Please contact support.");
        }
      }
    };

    const intervalId = setInterval(pollTransactionStatus, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isPolling, transactionResponse.data.reference, pollingAttempts]);

  useEffect(() => {
    if (decodedPathname.split("/")[1] === "training") {
      if (paymentInfo.start_date === "" || paymentInfo.training_type === "") {
        router.push("/training");
      }
    } else {
      if (paymentInfo.start_date === "" || paymentInfo.training_type === "") {
        router.push("/mentorship");
      }
    }
  }, [paymentInfo]);

  useEffect(() => {
    setTransactionStatus("");

    setTransactionResponse((prev) => ({
      ...prev,
      data: { access_code: "", authorization_url: "", reference: "" },
    }));

    if (pricingItem) {
      const priceArray = pricingItem.pricing.individuals.map(
        (item) => item.price
      );
      const price = priceArray.length > 0 ? priceArray[0] : 0;

      setGeneralPrice(price);
    }
  }, []);

  return (
    <section className="flex justify-center items-center w-full h-screen">
      {!isPolling && transactionStatus === "" && (
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="lg:w-3/4 w-full flex justify-center items-center flex-col gap-4 h-full"
        >
          <div>
            <label htmlFor="firstName" hidden></label>
            <input
              id="firstName"
              type="text"
              placeholder="firstname"
              onChange={handleChange}
              name="firstName"
              value={formData.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName" hidden></label>
            <input
              id="lastName"
              type="text"
              placeholder="lastname"
              onChange={handleChange}
              name="lastName"
              value={formData.lastName}
            />
          </div>
          <div>
            <label htmlFor="mail" hidden></label>
            <input
              id="mail"
              type="text"
              placeholder="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </div>

          <div>
            <label htmlFor="Currency" hidden></label>
            <select
              id="Currency"
              onChange={handleChange}
              name="currency"
              value={formData.currency}
            >
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-[#89C13E] py-3 px-4 text-white rounded-md flex justify-center items-center"
            >
              Submit
              {mutation.isPending && (
                <span className=" mx-2 flex justify-center items-center h-full">
                  <Loading />
                </span>
              )}
            </button>
          </div>
        </form>
      )}

      {isPolling && <Loading />}

      {!isPolling && transactionStatus === "completed" && (
        <Transaction_success data={dataValue} />
      )}

      {!isPolling && transactionStatus === "failed" && <Transaction_failed />}
    </section>
  );
}
