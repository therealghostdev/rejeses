import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/general/navigation/navigation";
import Footer from "@/components/general/footer/footer";
import localfont from "next/font/local";
import { PaymentProvider } from "@/utils/context/payment";
import Scroll_to_top from "@/components/general/bact_to_top/scroll_to_top";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

const bricolage_grotesque = localfont({
  src: [
    {
      path: "../../public/fonts/BricolageGrotesque/BricolageGrotesque-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/BricolageGrotesque/BricolageGrotesque-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/BricolageGrotesque/BricolageGrotesque-Light.ttf",
      weight: "200",
    },
  ],
  variable: "--font-bricolage-grotesque",
});

export const metadata: Metadata = {
  title: "Rejeses PM Consulting",
  description: "Learn and become excellent at project management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="el">
      <ToastContainer />
      <body className={`${inter.className} ${bricolage_grotesque.variable}`}>
        <PaymentProvider>
          <Navigation />
          {children}
          <Footer />
          <Scroll_to_top />
        </PaymentProvider>
      </body>
    </html>
  );
}
