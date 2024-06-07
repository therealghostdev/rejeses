import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/general/navigation/navigation";
import Footer from "@/components/general/footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
