"use client";

import React, { useEffect } from "react";

type PopupWrapperProps = {
  children: React.ReactNode;
  /** Warna overlay dalam format hex, contoh "#2b1512" */
  overlayColor?: string;
  /** Opacity overlay, 0-1 */
  overlayOpacity?: number;
  /** Blur strength overlay, contoh "3px" */
  blurAmount?: string;
  /** Jarak overlay dari tepi layar, contoh "4px" */
  edgeMargin?: string;
  /** Padding di sekitar content/card, contoh "50px" */
  contentPadding?: string;
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export default function PopupWrapper({
  children,
  overlayColor = "#2b1512",
  overlayOpacity = 0.6,
  blurAmount = "3px",
  edgeMargin = "4px",
  contentPadding = "50px",
}: PopupWrapperProps) {
  // Lock scroll body selama popup ini mounted, otomatis balik normal pas unmount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed z-40 flex items-center justify-center animate-popup-zoom"
      style={{
        top: edgeMargin,
        left: edgeMargin,
        right: edgeMargin,
        bottom: edgeMargin,
        backgroundColor: `rgba(${hexToRgb(overlayColor)}, ${overlayOpacity})`,
        //backdropFilter: `blur(${blurAmount})`,

        WebkitBackdropFilter: `blur(${blurAmount})`,
        padding: contentPadding,
      }}
    >
      {children}
    </div>
  );
}