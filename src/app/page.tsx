import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import HowItWorks from "@/components/HowItWorks";
import LocationSection from "@/components/LocationSection";
import ApartmentsSection from "@/components/ApartmentsSection";
import FAQSection from "@/components/FAQSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutSection />
      <HowItWorks />
      <LocationSection />
      <ApartmentsSection />
      <FAQSection />
      <ContactForm />
      <Footer />
    </>
  );
}
