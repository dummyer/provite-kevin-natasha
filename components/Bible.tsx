"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import CoupleNames from "@/app/sections/CoupleNames";
import "@/app/hero.css";

type BibleProps = {
    data: any;
};

const Bible = forwardRef<HTMLElement, BibleProps>(({ data }, ref) => {

    return (
        <div className="bible w-full lg:hidden bg-[#060606] mx-auto py-[29px] px-[24px]" id="bible">
    <div className="w-[250px] mx-auto">
        {/* Quote - lebar dibatasi biar jatuh presis 3 baris */}
        <p className="italic text-white text-left">
            “Love never stops being patient, never stops believing, never
            stops hoping, never gives up. So these three things remain:
            faith, hope, and love. But the best one of these is love.”
        </p>

        {/* Ayat - rata kanan, dalam container yg sama lebarnya */}
        <p className="ayat text-white text-right mt-[10px]">
            Corinthians 13:7, 13 GW
        </p>
    </div>
</div>
    );
});

Bible.displayName = "Bible";

export default Bible;