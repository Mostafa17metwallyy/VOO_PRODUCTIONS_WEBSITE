import HeroSection from "../components/HeroSection";
import ProductionsSection from "../components/ProductionsSection";
import SocialSection from "../components/SocialSection";
import ContactSection from "../components/ContactSection";
import ClientsCarousel from "../components/ClientsCarousel";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductionsSection />
      <ClientsCarousel />
      <SocialSection />
      <ContactSection />
    </>
  );
}
