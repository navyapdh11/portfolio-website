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
  metadataBase: new URL("https://www.aastaclean.com.au"),
  title: {
    default: "AASTACLEAN | Australia's Premier Cleaning Services — Nationwide Coverage",
    template: "%s | AASTACLEAN",
  },
  description: "Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs, police-checked & fully insured. Book online today.",
  keywords: "cleaning services Australia, end of lease cleaning, commercial cleaning, domestic cleaning, carpet cleaning, window cleaning, nationwide cleaning, AASTACLEAN",
  authors: [{ name: "AASTACLEAN" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.aastaclean.com.au",
  },
  openGraph: {
    title: "AASTACLEAN | Australia's Premier Cleaning Network",
    description: "Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs, police-checked & fully insured.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
    url: "https://www.aastaclean.com.au",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AASTACLEAN — Professional Cleaning Services Australia Wide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AASTACLEAN | Australia's Premier Cleaning Network",
    description: "Enterprise-grade cleaning services across all Australian states. 20+ specialist services, 8,000+ suburbs.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none">
          Skip to main content
        </a>
        <ScrollFix />
        <FloatingHomeButton />
        {children}
        <NanochatAssistant />
      </body>
    </html>
  );
}
