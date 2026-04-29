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
  title: "AASTACLEAN | Australia's Premier Cleaning Services — Nationwide Coverage",
  description: "Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs, police-checked & fully insured. Book online today.",
  keywords: "cleaning services Australia, end of lease cleaning, commercial cleaning, domestic cleaning, carpet cleaning, window cleaning, nationwide cleaning, AASTACLEAN",
  authors: [{ name: "AASTACLEAN" }],
  openGraph: {
    title: "AASTACLEAN | Australia's Premier Cleaning Network",
    description: "Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs, police-checked & fully insured.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
  },
};

import FloatingHomeButton from "@/components/FloatingHomeButton";

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
        <FloatingHomeButton />
        {children}
        <NanochatAssistant />
      </body>
    </html>
  );
}
