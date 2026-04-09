import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { TrustCertifications } from "@/components/TrustCertifications";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { FAQSection } from "@/components/FAQSection";
import Coverage from "@/components/Coverage";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustCertifications />
        <Services />
        <QuoteCalculator />
        <BeforeAfterGallery />
        <Coverage />
        <Pricing />
        <Reviews />
        <FAQSection />
        <Booking />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
