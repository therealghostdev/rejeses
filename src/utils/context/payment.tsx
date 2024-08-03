"use client";
import React, { createContext, useState, useContext } from "react";
import { PaymentInfo } from "../types/types";



const PaymentContext = createContext<{
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
}>({
  paymentInfo: {
    price: 0,
    training_id: null,
    training_type: "",
    start_date: "",
  },
  setPaymentInfo: () => {},
});

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    price: 0,
    training_id: null,
    training_type: "",
    start_date: "",
  });

  return (
    <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
      {children}
    </PaymentContext.Provider>
  );
};
