import Navbar from "@/components/layout/navbar";
import { useLocale } from "next-globe-gen";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Footer from "@/components/layout/footer";

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
  const locale = useLocale();
  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}