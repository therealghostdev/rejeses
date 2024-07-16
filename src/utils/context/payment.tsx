"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { PaymentInfo } from "@/utils/types/types";

const defaultPaymentInfo: PaymentInfo = {
  training_name: "Default Training",
  price: 0,
  duration: "N/A",
  name: "Default User",
  training_id: null,
};

// payment context type
interface PaymentContextType {
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [paymentInfo, setPaymentInfo] =
    useState<PaymentInfo>(defaultPaymentInfo);

  return (
    <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
      {children}
    </PaymentContext.Provider>
  );
};
