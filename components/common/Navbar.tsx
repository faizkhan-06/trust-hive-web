"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/public/assets/logo.svg";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Smooth hide on scroll down / show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);


  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed font-space-grotesk top-0 left-0 w-full z-50 transition-transform duration-500 ${showNav ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Main Nav */}
        <div className="w-full bg-[#161616] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Trust Hive" width={130} height={40} priority />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
              {["How it Works", "Reviews", "Businesses", "Pricing", "About"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="hover:text-white transition"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/login"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-full  text-sm font-medium transition flex items-center gap-2 
                bg-white text-black
                hover:opacity-90"
              >
                Create Account
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile Icon */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Announcement Bar */}
        <div
          className="w-full text-white text-sm 
  bg-gradient-to-r 
  from-[#4c1d95] 
  via-[#7c3aed] 
  to-[#a855f7] 
  shadow-[0_4px_25px_rgba(124,58,237,0.45)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-2 text-center">
            <p className="font-medium tracking-wide">
              🎉 Trust Hive is now live — Create your free account and start sharing reviews for free.
            </p>
          </div>
        </div>


      </header>

      {/* Mobile Dropdown */}
      <div
        className={`fixed inset-0 bg-[#161616] z-40 transition-transform duration-500 md:hidden ${mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="pt-44 pb-10 px-6 flex flex-col gap-6 text-white overflow-y-auto h-full">

          {["How it Works", "Reviews", "Businesses", "Pricing", "About"].map(
            (item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm border-b border-white/10 pb-3"
              >
                {item}
              </Link>
            )
          )}

          <Link
            href="/login"
            className="mt-4 text-white/70"
            onClick={() => setMobileOpen(false)}
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="mt-2 px-5 py-3 rounded-full text-center font-medium 
             bg-white text-black"
            onClick={() => setMobileOpen(false)}
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
