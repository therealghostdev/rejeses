"use client";
import React, { createContext, useState, useContext } from "react";
import { PaymentInfo } from "../types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
        {children}
      </PaymentContext.Provider>
    </QueryClientProvider>
  );
};
