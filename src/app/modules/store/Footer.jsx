// components/Footer.jsx
"use client";

import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Technology", href: "/technology" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ];

  const productLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Templates", href: "/templates" },
    { name: "Integrations", href: "/integrations" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/support" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl px-4 xl:px-0 mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                BN
              </div>
              <span className="text-xl font-semibold text-white">NFC Cards</span>
            </div>
            <p className="text-sm">
              Revolutionizing digital identity with cutting-edge NFC technology for professionals and businesses.
            </p>
            
            <div className="flex gap-4 pt-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <p className="text-sm">
                  123 Tech Park, Digital Avenue<br />
                  San Francisco, CA 94107
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <Link href="mailto:info@nfccards.com" className="text-sm hover:text-primary">
                  info@nfccards.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <Link href="tel:+11234567890" className="text-sm hover:text-primary">
                  +1 (123) 456-7890
                </Link>
              </div>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} NFC Cards. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}