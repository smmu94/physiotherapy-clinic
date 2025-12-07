import Navbar from "@/components/layout/navbar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Footer from "@/components/layout/footer";
import { auth } from "../../auth";
import { SessionProvider } from "next-auth/react";

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

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();
  return (
    <html>
      <body className={`${montserrat.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <SessionProvider session={session}>
          <Navbar session={session} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}