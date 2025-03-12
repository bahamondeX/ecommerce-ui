"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/landscape.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>

      <div className="relative container px-4 py-24 md:py-36 flex flex-col items-start">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">🇵🇪</span>
            <span className="text-amber-800 font-medium">Direct from Peru</span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-amber-900 to-amber-600 bg-clip-text text-transparent">
              Premium Organic
            </span>
            <span className="block">Coffee & Black Maca</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            Discover our exceptional collection of organic coffee and black
            maca, ethically sourced from the highlands of Peru.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="font-medium bg-gradient-to-r from-amber-800 to-amber-600 hover:from-amber-700 hover:to-amber-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/products">Shop Now</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-amber-600 text-amber-800 hover:bg-amber-50 hover:text-amber-900 transition-all duration-300"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 -mb-16 md:-mb-24 -mr-16 md:-mr-24 rounded-full bg-gradient-to-br from-amber-200/20 to-amber-500/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </div>
  );
}
