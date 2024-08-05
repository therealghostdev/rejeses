"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { PaymentInfo } from "../types/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface NavigationContextType {
  isNigeria: boolean;
  setIsNigeria: React.Dispatch<React.SetStateAction<boolean>>;
}

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

// Create the navigation context
const NavigationContext = createContext<NavigationContextType>({
  isNigeria: false,
  setIsNigeria: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

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

  const [isNigeria, setIsNigeria] = useState(false);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setIsNigeria(data.country_code === "NG");
      } catch (error) {
        console.error("Error checking location:", error);
        setIsNigeria(false);
      }
    };

    checkLocation();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContext.Provider value={{ isNigeria, setIsNigeria }}>
        <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
          {children}
        </PaymentContext.Provider>
      </NavigationContext.Provider>
    </QueryClientProvider>
  );
};
