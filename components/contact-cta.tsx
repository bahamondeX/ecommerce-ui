import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container px-4 text-center">
        <h2 className="font-playfair text-3xl font-bold mb-4">
          Have Questions?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our team is here to help you find the perfect products for your needs.
          Whether you have questions about our organic coffee, maca, or other
          products, we're just a message away.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}
