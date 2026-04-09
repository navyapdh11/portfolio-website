import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AASTACLEAN | Professional Cleaning Services in Perth WA",
  description: "Professional cleaning services in Perth, Western Australia. Residential, commercial & end-of-lease cleaning. Contact: 51 Tate Street, West Leederville 6007. Phone: 08 9000 0000, Mobile: 0405 866 459.",
  keywords: "cleaning services, Perth WA, house cleaning, end of lease cleaning, commercial cleaning, West Leederville, AASTACLEAN",
  authors: [{ name: "AASTACLEAN" }],
  openGraph: {
    title: "AASTACLEAN | Professional Cleaning Services in Perth",
    description: "Professional cleaning services in Perth, Western Australia. Residential, commercial & end-of-lease cleaning.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
  },
};

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
