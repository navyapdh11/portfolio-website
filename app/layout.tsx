import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NanochatAssistant from "@/components/NanochatAssistant";
import { ScrollFix } from "@/components/ScrollFix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AASTACLEAN | AI-Native Cleaning Services in Perth WA",
  description: "2026 Enterprise-grade cleaning services in Perth, Western Australia. Powered by Nanochat AI. Contact: 51 Tate Street, West Leederville 6007.",
  keywords: "cleaning services, Perth WA, AI-native cleaning, nanochat, house cleaning, end of lease cleaning, commercial cleaning, AASTACLEAN",
  authors: [{ name: "AASTACLEAN" }],
  openGraph: {
    title: "AASTACLEAN | AI-Native Professional Cleaning Services in Perth",
    description: "Enterprise-grade cleaning services powered by Next-Gen AI models. Residential, commercial & end-of-lease cleaning.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
  },
};

import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollFix />
        {children}
        <NanochatAssistant />
        <Analytics />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
