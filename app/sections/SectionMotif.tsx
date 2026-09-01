import type { ReactNode } from "react";

export default function SectionMotif({
  id,
  children,
  className = "",
  shadowPosition,
  paddingX = 'px-[10px]'
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  shadowPosition?: "first" | "last";
  paddingX?: string;
}) {
  const shadow =
    shadowPosition === "first"
      ? "0 -6px 16px -8px rgba(72, 71, 71, 0.4)"
      : "0 6px 16px -8px rgba(72, 71, 71, 0.4)";

  const framerounded =
    shadowPosition === "first"
      ? "rounded-tl-[50vw] rounded-tr-[50vw] mt-[41px] lg:mt-[80px]"
      : shadowPosition === "last"
        ? "rounded-bl-[50vw] rounded-br-[50vw] mb-[31px] lg:mb-[63px]"
        : "";

  return (
    <section
      id={id}
      className={`relative flex flex-col items-center justify-center text-center `}
    >
      <div
        className={`
      w-full h-full
      bg-scroll bg-cover bg-center
      
    overflow-hidden
      items-center flex flex-col
      ${className}
      ${framerounded}
    `}
        style={{
          // backgroundColor: "blue"
          // backgroundImage: shadowPosition == 'last' ? "url('/images/rsvp_bg_motif.png')" : "url('/images/hero_bg_motif.png')",
          // boxShadow: shadow,
          //opacity: 1
        }}
      >
        {children}

      </div>
    </section>
  );
}