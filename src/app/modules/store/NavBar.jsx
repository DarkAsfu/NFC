"use client";

import { User, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 -mt-30 md:-mt-16",
          hasScrolled ? "bg-black/30 shadow-sm backdrop-blur-md" : "bg-transparent backdrop-blur-none",
          "text-white" // Added white text color
        )}
      >
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/10 text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black font-bold">
                BN
              </div>
              <span className="text-lg font-semibold hidden sm:inline-block text-white">
                BrandName
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className="text-sm font-medium text-white hover:text-white hover:bg-white/10"
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              className="md:hidden group relative overflow-hidden px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-[14px] hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              asChild
            >
              <Link href="/login" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>

            <div className="hidden md:flex gap-2 ml-2">
              <Button 
                // variant="outline" 
                size="sm" 
                className="group relative overflow-hidden px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-[14px] hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                asChild
              >
                <Link href="/login" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button 
                size="sm" 
                className="bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 mt-16 bg-bG overflow-y-auto transition-transform duration-300 ease-in-out text-white",
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 px-4 text-lg font-medium rounded-lg hover:bg-white/10 transition-colors text-white"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/20">
            <div className="flex flex-col gap-3">
              <Button 
                className="group relative overflow-hidden px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-[14px] hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                asChild
              >
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button 
                className="w-full bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="/register" onClick={toggleMenu}>
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}