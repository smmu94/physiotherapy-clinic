import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ELON Physio",
  description: "Physiotherapy Clinic",
  icons: {
    icon: "/favicon.svg",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}