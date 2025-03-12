import { HeroSection } from "@/components/hero-section";
import { FeaturedProducts } from "@/components/featured-products";
import { AboutPreview } from "@/components/about-preview";
import { ContactCta } from "@/components/contact-cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <AboutPreview />
      <ContactCta />
    </main>
  );
}
