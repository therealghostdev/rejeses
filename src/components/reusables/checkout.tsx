"use client";
import { ClientPageProps } from "@/utils/types/types";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  FormDataTYpe,
  OrderResponse,
  TransactionResponseType,
} from "@/utils/types/types";
import { usePayment } from "@/utils/context/payment";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import PaystackPop from "@paystack/inline-js";

export default function Checkout({ pricingItem }: ClientPageProps) {
  const [generapPrice, setGeneralPrice] = useState<number>(0);
  const { paymentInfo } = usePayment();
  const [transactionResponse, setTransactionResponse] =
    useState<TransactionResponseType>({
      data: { authorization_url: "", access_code: "", reference: "" },
    });

  const pathname = usePathname();
  const decodedPathname = useMemo(
    () => decodeURIComponent(pathname),
    [pathname]
  );

  const [formData, setFormData] = useState<FormDataTYpe>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const popup = new PaystackPop();

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        currency: "NGN",
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

  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        formData.lastName !== "" &&
        formData.firstName !== "" &&
        emailRegex.test(formData.email)
      ) {
        const response = await createTransaction(formData);

        if (response) {
          return response.data;
        } else {
          console.log("error creating transaction");
        }
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
    }));

    setTransactionResponse((prev) => ({
      ...prev,
      data: { access_code: "", authorization_url: "", reference: "" },
    }));
  };

  useEffect(() => {
    continueTransaction();
  }, [transactionResponse]);

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
      <form
        onSubmit={handleFormSubmit}
        action=""
        className="lg:w-3/4 w-full flex justify-center items-center flex-col gap-4 h-full"
      >
        <div>
          <label htmlFor=""></label>
          <input
            type="text"
            placeholder="firstname"
            onChange={handleChange}
            name="firstName"
            value={formData.firstName}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="text"
            placeholder="lastname"
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
          />
        </div>
        <div>
          <label htmlFor=""></label>
          <input
            type="text"
            placeholder="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#89C13E] py-3 px-4 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
