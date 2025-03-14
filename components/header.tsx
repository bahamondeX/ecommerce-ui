"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import CartSideBar from "@/components/cart/card-sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import Auth from "@/components/auth";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();
  const { isAuthenticated, user, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const handleAuthExpand = (expanded: boolean) => {
    // Implement your resizer logic here based on the expanded state.
    // For example, you might want to adjust the layout or styling.
    console.log("Auth component expanded:", expanded);
    // Add logic to resize or adjust layout based on expanded state.
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-playfair text-xl md:text-2xl font-bold flex items-center group"
        >
          <img src="/favicon.png" className="h-12 w-12 rounded-full m-4 p-0" />
          <span className="bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
            CoffeeSuyo
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={`text-sm transition-all duration-300 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300 ${
                  pathname === link.href
                    ? "text-primary font-medium after:w-full"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Auth onExpand={() => handleAuthExpand(true)} />
          {isAuthenticated && user && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-amber-100 transition-colors duration-300"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-700 to-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Button>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-amber-100 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-background border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Cart Sheet */}
      {isAuthenticated && user && <CartSideBar user={user} logout={logout} />}
    </header>
  );
}