import type { Metadata } from "next";
import MicrotasksContent from "./MicrotasksContent";

export const metadata: Metadata = {
  title: "AI Microtasks | AASTACLEAN - Earn Money Cleaning",
  description: "AASTACLEAN AI Microtasks - Earn $0.10-$2.00 per task training cleaning AI models. Uber-style microtasks for cleaners. View available tasks, heatmap, job offers, and earnings.",
  keywords: "AI microtasks, earn money, cleaning jobs, gig economy, AI training, data labeling, cleaning AI",
  authors: [{ name: "AASTACLEAN" }],
  openGraph: {
    title: "AI Microtasks | AASTACLEAN - Earn Money Cleaning",
    description: "Earn $0.10-$2.00 per task training cleaning AI models.",
    type: "website",
    locale: "en_AU",
    siteName: "AASTACLEAN",
    url: "https://aastaclean.com.au/microtasks",
  },
  alternates: {
    canonical: "https://aastaclean.com.au/microtasks",
  },
};

export default function MicrotasksPage() {
  return <MicrotasksContent />;
}