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
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          hasScrolled ? "bg-background shadow-sm" : "bg-background",
          "backdrop-blur supports-[backdrop-filter]:bg-background"
        )}
      >
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                BN
              </div>
              <span className="text-lg font-semibold hidden sm:inline-block">
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
                className="text-sm font-medium hover:text-primary"
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="md:hidden" asChild>
              <Link href="/login" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>

            <div className="hidden md:flex gap-2 ml-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Optional backdrop for mobile menu */}
      {/* <div
        className={cn(
          "fixed inset-0 z-30 bg-black transition-opacity duration-300",
          isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMenu}
      /> */}

      {/* Mobile Menu - Always rendered, animated */}
      <div
        className={cn(
          "fixed inset-0 z-40 mt-16 bg-background overflow-y-auto transition-transform duration-300 ease-in-out",
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
              className="py-3 px-4 text-lg font-medium rounded-lg hover:bg-accent transition-colors"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t">
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full" asChild>
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </Button>
              <Button className="w-full" asChild>
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
