"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 py-4 ${
          isScrolled ? "bg-white text-gray-800 shadow-sm" : " text-white"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            {/* <img src="/logo.png" alt="Logo" className="h-8 mr-3" /> */}
            <span className="text-xl font-bold font-serif">SaaS Demo</span>
          </div>
          <div className="flex space-x-6">
            <nav className="hidden md:flex space-x-6 my-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isScrolled ? "hover:text-gray-600" : "hover:text-gray-200 "
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/login">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-white rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/signup?plan=FREE">
              <Button className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-full">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="pt-16">{children}</div>
    </div>
  );
}
