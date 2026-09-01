"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const MENU_ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "PROFILE", href: "#profile" },
  { label: "DATE", href: "#date" },
  { label: "EVENT DETAIL", href: "#eventdetail" },
  { label: "GALLERY", href: "#gallery" },
  { label: "DRESS CODE", href: "#dresscode" },
  { label: "RSVP", href: "#rsvp" },
  { label: "GIFT", href: "#gift" },
  { label: "WISHES", href: "#wishes" },
];

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren",
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const arrowVariants: Variants = {
  rest: {
    width: 0,
    opacity: 0,
    marginRight: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  hover: {
    width: 14,
    opacity: 1,
    marginRight: 8,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

const ARROW_ANIM_MS = 220; // samain sama arrowVariants.hover.transition.duration (0.22s)

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");

    // Paksa animasi panah ke state "hover" penuh via state React, bukan
    // whileTap — soalnya di HP jari cuma nempel sebentar (~100ms), jadi
    // whileTap keburu revert sebelum animasi 220ms-nya kelar.
    setActiveHref(href);

    setTimeout(() => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, ARROW_ANIM_MS);
  };

  return (
    <section className="absolute z-11">
      {/* Tombol menu, tetep fixed di pojok kiri atas, cuma muncul pas menu TERTUTUP */}
      {!open && (
        <div className="fixed top-0 left-0 z-0 flex items-center justify-between px-[22px] py-[21px] lg:px-[47px] lg:py-[50px]">
          <button onClick={() => { setOpen(true); setActiveHref(null); }} aria-label="Open menu" className="hover">
            <Image src="/ico/ic_menu.svg" alt="Menu" width={25} height={17} className="lg:w-[44px] lg:h-[30px]" />
          </button>
        </div>
      )}

      {/* Dropdown panel, punya tombol X sendiri di dalamnya */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed my-[11px] mx-[22px] lg:mx-[47px] lg:my-[38px] top-0 left-0 z-0 w-[255px] max-w-[80vw] lg:w-[424px] h-auto bg-[#7B7B7B]/76 flex flex-col"
            style={{ transform: "translateZ(0)", transformOrigin: "top left" }}
          >
            {/* Tombol X, terpisah dari tombol menu */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute pl-1 pt-[2px] text-white text-[22px] lg:text-[40px] lg:mt-[-5px] hover"
              style={{
                fontWeight: 300,
                fontFamily: "IBM Plex Sans",
              }}
            >
              ✕
            </button>

            <div className="flex flex-col px-[30px] pt-9 pb-[38px] lg:pt-[57.78px] lg:pb-[62px] lg:pl-[51px]">
              {MENU_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="h-[25px] flex items-start lg:h-[41.54]"
                >
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="menu_text flex items-center hover"
                    initial="rest"
                    animate={activeHref === item.href ? "hover" : "rest"}
                    whileHover="hover"
                  >
                    <motion.span
                      variants={arrowVariants}
                      className="inline-flex items-center overflow-hidden shrink-0"
                    >
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="lg:w-[14px] lg:h-[10px] shrink-0">
                        <path
                          d="M1 5H13M13 5L9 1M13 5L9 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                    {item.label}
                  </motion.a>
                </motion.div>
              ))}
              <motion.p variants={itemVariants} className="menu_info mt-[7px] lg:mt-[28.46px]">
                Select a section above to continue
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}