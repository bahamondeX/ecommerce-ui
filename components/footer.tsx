"use client";

import Link from "next/link";
import {
  Coffee,
  CreditCard,
  Facebook,
  Instagram,
  LinkIcon,
  PillIcon,
  Twitter,
} from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-50 to-amber-100/50 border-t border-amber-200">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="font-playfair text-xl font-bold flex items-center group mb-4"
            >
              <Coffee className="h-5 w-5 mr-2 text-amber-800 group-hover:text-amber-600 transition-colors duration-300" />
              <span className="bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
                CoffeeSuyo
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Premium organic coffee and black maca sourced directly from
              sustainable farms in Peru.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-amber-700 hover:text-amber-500 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Facebook</span>
                <Facebook />
              </motion.a>
              <motion.a
                href="#"
                className="text-amber-700 hover:text-amber-500 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram />
              </motion.a>
              <motion.a
                href="#"
                className="text-amber-700 hover:text-amber-500 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Twitter</span>
                <Twitter />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-amber-900">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=coffee"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Coffee
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=maca"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Black Maca
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=superfoods"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Superfoods
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=tea"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Herbal Teas
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=gifts"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-amber-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-amber-900">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-amber-700 transition-colors duration-300 hover-lift inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CoffeeSuyo. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-amber-800">
              <CreditCard />
            </div>
            <div className="flex items-center text-amber-800">
              <LinkIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
