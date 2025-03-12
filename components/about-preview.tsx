"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AboutPreview() {
  return (
    <section className="bg-gradient-to-b from-amber-50/50 to-background py-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative aspect-square overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/FarmHarvesting.png"
              alt="Organic coffee farm in Peru"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md flex items-center">
              <span className="text-xl mr-2">🇵🇪</span>
              <span className="text-amber-900 font-medium">
                Peruvian Highlands
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-3xl font-bold mb-4 bg-gradient-to-r from-amber-900 to-amber-600 bg-clip-text text-transparent">
              Our Commitment to Quality
            </h2>
            <p className="mb-4 text-muted-foreground">
              At CoffeeSuyo, we believe in the power of nature. Our journey
              began in the highlands of Peru, where we discovered the
              exceptional quality of high-altitude, shade-grown coffee and
              native black maca.
            </p>
            <p className="mb-6 text-muted-foreground">
              Today, we work directly with small-scale farmers in Peru who share
              our commitment to sustainable, organic farming practices. Every
              product in our collection is carefully selected, ethically
              sourced, and crafted to bring you the authentic flavors and
              benefits of Peru's natural bounty.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                className="border-amber-600 text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition-all duration-300"
              >
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
