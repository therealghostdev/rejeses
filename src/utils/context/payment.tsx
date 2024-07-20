"use client"
import React, { createContext, useState, useContext } from 'react';

interface PaymentInfo {
  price: number;
  training_id: number | null;
  training_option?: string;
  is_group?: boolean;
}

const PaymentContext = createContext<{
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
}>({
  paymentInfo: { price: 0, training_id: null },
  setPaymentInfo: () => {}
});

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ price: 0, training_id: null });

  return (
    <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
      {children}
    </PaymentContext.Provider>
  );
};
