declare module "@paystack/inline-js" {
  interface PaystackPopOptions {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    callback?: (response: any) => void;
    onClose?: () => void;
  }

  class PaystackPop {
    new(): PaystackPop;
    setup(options: PaystackPopOptions): void;
    openIframe(): void;
    resumeTransaction(access_code: string): void;
  }

  export default PaystackPop;
}
