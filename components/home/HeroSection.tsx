"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import heroImg from "@/public/assets/hero-img.png";
import spiral from "@/public/assets/spiral.svg"

const HeroSection = () => {
  return (
    <section className="font-space-grotesk w-full min-h-screen bg-[#0f0f0f] pt-40 overflow-hidden relative">
      <div className="container mx-auto px-6">

        {/* TEXT */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Collect Real Testimonials.
            <br />
            Build Instant Trust.
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-white/80 font-medium leading-relaxed">
            Gather authentic customer reviews and showcase them beautifully.
          </p>
        </div>

        {/* PRODUCT IMAGE */}
        <div className="relative mt-24 w-full flex justify-center">

          {/* Floating Image */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-[95%] max-w-[1400px]"
          >
            <Image
              src={heroImg}
              alt="Trust Hive Dashboard"
              className="w-full rounded-3xl shadow-2xl shadow-secondary/10 "
              priority
            />
          </motion.div>
        </div>

        <div className=" absolute -top-20 -right-44 opacity-25">
          <Image src={spiral} alt="spiral" className=" w-lg"  />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
