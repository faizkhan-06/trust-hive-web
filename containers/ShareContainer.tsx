"use client";

import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { Download, Copy, QrCode, Star } from "lucide-react";
import userStore from "@/stores/UserStore";
import * as htmlToImage from "html-to-image";

const ShareContainer = () => {
  const reviewURL = `${process.env.NEXT_WEB_ENDPOINT}/business/${userStore.user?.business.slug}`;

  const qrPosterRef = useRef<HTMLDivElement | null>(null);

  // Copy link
  const handleCopy = () => navigator.clipboard.writeText(reviewURL);


  // Download Poster (Styled QR Card)
  const handleDownload = async () => {
    if (!qrPosterRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(qrPosterRef.current, {
        cacheBust: true,
        pixelRatio: 2, // stable high quality
        backgroundColor: "#0f0f0f", // prevents transparency crash
      });

      const link = document.createElement("a");
      link.download = `${userStore.user?.business.name}-qr-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };


  return (
    <div className="h-full w-full px-4 py-8 space-y-10 bg-gradient-to-br from-black via-[#0f0f0f] to-black text-white">

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Share & Collect Reviews
        </h2>
        <p className="text-white/60 text-sm">
          Share your review page and start collecting feedback instantly.
        </p>
      </div>

      {/* QR Share Section */}
      <div className="rounded-3xl p-8 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-30" />

        {/* Left Content */}
        <div className="space-y-5 relative z-10">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <QrCode className="w-6 h-6 text-white" />
            Share with QR Code
          </h3>

          <p className="text-white/60 text-sm leading-relaxed">
            Print this QR code on posters, counters, or receipts so customers
            can instantly leave a review.
          </p>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl
          text-sm font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/40"
          >
            <Download className="w-4 h-4" />
            Download QR Poster
          </button>
        </div>

        {/* Right — QR Glass Poster */}
{/* Right — QR Poster */}
<div
  ref={qrPosterRef}
  className="w-[360px] aspect-square rounded-3xl 
  bg-gradient-to-br from-[#111] via-[#161616] to-[#0f0f0f]
  border border-white/10 
  shadow-2xl 
  p-6 flex flex-col"
>

  {/* Top Section */}
  <div className="text-center space-y-2">
    <h3 className="text-xl font-semibold truncate">
      {userStore.user?.business.name}
    </h3>

    <div className="w-14 h-0.5 mx-auto bg-linear-to-r from-transparent via-gray-800 to-transparent rounded-full" />

    <p className="text-white/50 text-xs uppercase tracking-widest">
      {userStore.user?.business.type}
    </p>
  </div>

  {/* Middle Section (Flexible Area) */}
  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-4">

    <div className="bg-white p-4 rounded-2xl shadow-xl">
      <QRCode value={reviewURL} size={170} />
    </div>

    <p className="text-xs text-white/60 tracking-wide">
      Scan to leave a review
    </p>

    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-secondary text-sm">
          <Star fill="#7c3aed" />
        </span>
      ))}
    </div>

  </div>

  {/* Footer (Always Visible) */}
  <div className="pt-4 border-t border-white/10 text-center space-y-2">
    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
      Powered by
    </p>

    <img
      src="/assets/logo.svg"
      alt="TrustHive"
      className="h-6 mx-auto object-contain"
    />
  </div>
</div>


      </div>

      {/* Link Share Section */}
      <div className="rounded-3xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl space-y-4">

        <h3 className="text-xl font-semibold">Share Public Link</h3>

        <p className="text-white/60 text-sm">
          Send this link via email, WhatsApp, or social media.
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 bg-black/40 px-4 py-3 rounded-xl text-white text-sm font-mono border border-white/10 overflow-hidden">
            {reviewURL}
          </div>

          <button
            onClick={handleCopy}
            className="bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );

};

export default ShareContainer;
