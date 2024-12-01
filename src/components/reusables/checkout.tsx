"use client";
import { ClientPageProps } from "@/utils/types/types";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
} from "react";
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
import { TransactionDataType, OrderDataType } from "@/utils/types/types";
import Transaction_success from "./checkout_components/transaction_success";
import Transaction_failed from "./checkout_components/transaction_failed";
import Image from "next/image";
import Transaction_error from "./checkout_components/transaction_error";
import { AnimatePresence } from "framer-motion";

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

  const [orderValue, setOrderValue] = useState<OrderDataType>({
    id: 0,
    firstName: "",
    lastName: "",
    courseType: "",
    startDate: "",
    email: "",
    amount: 0,
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  const [modal, setModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [price, setPrice] = useState<number>(0);

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

  function formatPrice(price: number | undefined): string | undefined {
    if (price && price >= 1000) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      if (price) {
        return price.toString();
      }
    }
  }

  const popup = useMemo(() => new PaystackPop(), []);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setModal(!modal);
    setTransactionStatus("");
    setErrorMessage("");
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
        amount: getPrice(),
        currency: formData.currency,
      };

      const response = await axios.post<OrderResponse>(
        "/api/order",
        JSON.stringify(orderBodyParam)
      );

      return response.data;
    } catch (err) {
      console.error("Something went wrong creating order", err);
      setModal(true);
      setErrorMessage("Something went wrong creating your order 😓");
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
      setModal(true);
      setErrorMessage("Something went wrong processing order 😓");
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
  const handleFormSubmit = async (
    e: FormEvent<HTMLButtonElement> | ReactKeyboardEvent
  ) => {
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
        const { status, data, order } = response.data;

        if (status === 200 && data.status === "completed") {
          setDataValue(data);
          setOrderValue(order);
          setIsPolling(false);
          setTransactionStatus("completed");
          setModal(true);
        } else if (status === 200 && data.status === "failed") {
          setIsPolling(false);
          setTransactionStatus("failed");
          setModal(true);
        } else {
          setPollingAttempts((prev) => prev + 1);
          if (pollingAttempts >= MAX_POLLING_ATTEMPTS) {
            setIsPolling(false);
            setModal(true);
            setErrorMessage(
              "Transaction status check timed out. Please contact support."
            );
          }
        }
      } catch (error) {
        console.error("Error polling transaction status", error);
        setModal(true);
        setErrorMessage("Error getting transaction status");
        setPollingAttempts((prev) => prev + 1);
        if (pollingAttempts >= MAX_POLLING_ATTEMPTS) {
          setIsPolling(false);
          setModal(true);
          setErrorMessage(
            "Error checking transaction status. Please contact support."
          );
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

    setErrorMessage("");

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

  const getPrice = useCallback((): number => {
    let price;
    if (isNigeria && formData.currency === "NGN") {
      price = paymentInfo.price2;
    } else if (isNigeria && formData.currency === "USD") {
      price = paymentInfo.price;
    } else if (!isNigeria && formData.currency === "NGN") {
      price = paymentInfo.price;
    } else if (!isNigeria && formData.currency === "USD") {
      price = paymentInfo.price2;
    } else {
      price = 0;
    }
    return price;
  }, [isNigeria, formData.currency, paymentInfo.price, paymentInfo.price2]);

  useEffect(() => {
    setPrice(getPrice());
  }, [getPrice]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleFormSubmit(e);
    }
  };

  return (
    <section
      className="flex justify-center items-center w-full min-h-screen px-8 py-12"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {(transactionStatus === "completed" ||
        transactionStatus === "failed" ||
        errorMessage !== "") && (
        <div className="overlay fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}

      {!isPolling && (
        <div className="w-full h-full flex gap-x-4 lg:flex-row flex-col-reverse md:px-8">
          <div className="lg:w-2/4 w-full flex py-6 px-4 items-center flex-col gap-4 lg:h-full lg:my-auto my-4">
            <div className="w-full flex flex-col gap-y-6">
              <h1 className="font-bold lg:text-5xl text-3xl">Checkout</h1>

              <p className="lg:text-3xl text-2xl">
                Personal Information & Billing
              </p>
            </div>
            <form className="w-full flex flex-col justify-center items-center">
              <div className="w-full py-4 flex items-center">
                <label htmlFor="firstName" hidden></label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                  className="lg:w-3/4 w-[98%] py-3 px-4 bg-[#F7F8F9] rounded-md border border-[#DBE1E7] outline-none text-[#666666]"
                />
              </div>

              <div className="w-full py-4 flex items-center">
                <label htmlFor="lastName" hidden></label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                  className="lg:w-3/4 w-[98%] py-3 px-4 bg-[#F7F8F9] rounded-md border border-[#DBE1E7] outline-none text-[#666666]"
                />
              </div>

              <div className="w-full py-4 flex items-center">
                <label htmlFor="mail" hidden></label>
                <input
                  id="mail"
                  type="text"
                  placeholder="Email Address"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  className="lg:w-3/4 w-[98%] py-3 px-4 bg-[#F7F8F9] rounded-md border border-[#DBE1E7] outline-none text-[#666666]"
                />
              </div>

              <div className="w-full py-4 flex items-center">
                <label htmlFor="Currency" hidden></label>
                <select
                  title="currency value"
                  id="Currency"
                  onChange={handleChange}
                  name="currency"
                  value={formData.currency}
                  className="lg:w-3/4 w-[98%] py-3 px-8 bg-[#F7F8F9] rounded-md border border-[#DBE1E7] outline-none text-[#666666]"
                >
                  <option value="NGN" className="text-lg py-5">
                    NGN
                  </option>
                  <option value="USD" className="text-lg py-5">
                    USD
                  </option>
                </select>
              </div>
            </form>
          </div>

          <div className="lg:w-2/4 w-full lg:h-full flex flex-col justify-center gap-5 md:px-4 py-4">
            <div className="flex justify-start">
              <h1 className="font-bold text-left text-2xl">Your Order</h1>
            </div>

            <div className="w-full flex justify-between text-lg py-4 border-b border-dashed border-b-[#DBE1E7]">
              <h1>Product</h1>
              <h1>Subtotal</h1>
            </div>

            <div className="w-full flex justify-between py-4 border-b border-dashed border-b-[#DBE1E7]">
              <div className="max-w-3/4 flex lg:h-auto md:h-20">
                <div className="w-3/4 flex md:flex-row flex-col justify-center">
                  <div className="flex justify-center items-center h-full w-48 border border-[#FFFAF5]  bg-[#FFE0C2] rounded-md mx-2">
                    <Image
                      src="/trophy.svg"
                      width={60}
                      height={30}
                      alt="certification"
                      className=""
                    />
                  </div>
                  <div className="mx-2 flex justify-center flex-col lg:my-auto md:mt-0 mt-2">
                    <h1 className="font-bold lg:text-wrap md:text-ellipsis md:text-nowrap lg:my-2 md:mb-0 mb-2">
                      Project Management Training
                    </h1>
                    <p className="lg:text-wrap text-nowrap text-ellipsis">
                      Certificate of completion
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="font-bold">
                  {(isNigeria || !isNigeria) && formData.currency === "NGN"
                    ? "NGN "
                    : (isNigeria || !isNigeria) && formData.currency === "USD"
                    ? "$"
                    : ""}
                  {formatPrice(price)}
                </h1>
              </div>
            </div>

            <div className="w-full flex justify-between items-center py-4 border-b border-dashed border-b-[#DBE1E7]">
              <h1 className="font-bold">Subtotal</h1>
              <h1 className="font-bold">
                {(isNigeria || !isNigeria) && formData.currency === "NGN"
                  ? "NGN "
                  : (isNigeria || !isNigeria) && formData.currency === "USD"
                  ? "$"
                  : ""}
                {formatPrice(price)}
              </h1>
            </div>

            <div className="w-full flex justify-between items-center py-4 border-b border-b-[#DBE1E7]">
              <h1 className="font-bold">TOTAL</h1>
              <h1 className="text-[#89C13E] font-bold">
                {(isNigeria || !isNigeria) && formData.currency === "NGN"
                  ? "NGN "
                  : (isNigeria || !isNigeria) && formData.currency === "USD"
                  ? "$"
                  : ""}
                {formatPrice(price)}
              </h1>
            </div>

            <div className="w-full flex justify-center items-center">
              <button
                onClick={handleFormSubmit}
                className="bg-[#89C13E] py-6 px-4 text-white rounded-md flex justify-center items-center w-full"
              >
                Complete Checkout
                {mutation.isPending && (
                  <span className=" mx-2 flex justify-center items-center h-full">
                    <Loading />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {isPolling && <Loading />}

      <AnimatePresence>
        {!isPolling && transactionStatus === "completed" && modal && (
          <Transaction_success
            data={dataValue}
            close={closeModal}
            order={orderValue}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isPolling && transactionStatus === "failed" && modal && (
          <Transaction_failed close={closeModal} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isPolling &&
          transactionStatus !== "failed" &&
          transactionStatus !== "completed" &&
          errorMessage !== "" &&
          modal && (
            <Transaction_error close={closeModal} error={errorMessage} />
          )}
      </AnimatePresence>
    </section>
  );
}
