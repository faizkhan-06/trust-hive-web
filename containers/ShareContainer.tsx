"use client";

import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { Download, Copy, QrCode } from "lucide-react";
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
        quality: 1.0,
        pixelRatio: 3, // SUPER SHARP PNG
        canvasWidth: qrPosterRef.current.clientWidth * 3,
        canvasHeight: qrPosterRef.current.clientHeight * 3,
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
    <div className="h-full w-full px-3 py-6 space-y-8">

      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl tracking-tight font-bold text-gray-900">
          Share & Collect Reviews
        </h2>
        <p className="text-gray-500 text-sm">
          Choose a method to share your review page and start collecting feedback.
        </p>
      </div>

      {/* QR Share Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-primary" />
            Share with a QR Code
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed">
            Display this QR code on posters, counters, or receipts for customers
            to easily leave a review.
          </p>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl
      text-sm font-medium hover:bg-primary/90 transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download QR Poster
          </button>
        </div>

        {/* Right — QR Preview */}
        <div className="flex justify-center md:justify-end">
          <div
            ref={qrPosterRef}
            className="w-[200px] rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Header strip */}
            <div className="bg-primary text-white py-3 px-4 text-center">
              <h3 className="text-lg font-semibold tracking-wide truncate">
                {userStore.user?.business.name} 
              </h3>
              <p className="text-white/80 text-[11px] mt-0.5 truncate">
                {userStore.user?.business.type}
              </p>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col items-center">
              <p className="text-gray-600 text-xs mb-3 tracking-wide">
                Scan to leave a review
              </p>

              <div className="bg-gray-50 p-3 rounded-xl shadow-inner border border-gray-200">
                <QRCode value={reviewURL} size={120} />
              </div>

              <div className="mt-3 flex items-center gap-0.5 justify-center">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>

              <p className="text-[10px] text-gray-500 mt-1">
                Trusted by your customers
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 py-2 text-center">
              <p className="text-[10px] text-gray-500 tracking-wide">
                powered by <span className="font-semibold text-primary font-black-han-sans">TrustHive</span>
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Link Share Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">Share Your Public Link</h3>
        <p className="text-gray-500 text-sm">
          Share via email, social media, or messaging apps.
        </p>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 bg-gray-100 px-4 py-3 rounded-xl text-gray-800 text-sm font-mono border border-gray-200 shadow-inner overflow-hidden">
            {reviewURL}
          </div>
          <button
            onClick={handleCopy}
            className="bg-gray-200 hover:bg-gray-300 transition px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
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
