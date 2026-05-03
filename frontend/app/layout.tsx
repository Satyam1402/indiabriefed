import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNews from "@/components/BreakingNews";
import Chatbot from "@/components/Chatbot/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IndiaBriefed - Your Daily Dose of India News",
  description: "Stay updated with the latest news, current affairs, and updates for UPSC and SSC aspirants. IndiaBriefed brings you comprehensive coverage of National, International, Economy, Science & Technology, and more.",
  keywords: "India news, current affairs, UPSC, SSC, daily news, breaking news, national news, international news, economy, science, technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <BreakingNews />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
