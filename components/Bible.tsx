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
        <div className="bible w-full lg:hidden" id="bible">
            <div className="flex flex-col w-full bg-[#060606] px-[48px] py-[29px]">
                <p className="text-justify">“Love never stops being patient, never stops believing, never stops hoping, never gives up. So these three things remain: faith, hope, and love. But the best one of these is love.”</p>
                <div className="ayat mt-[6px]">Corinthians 13:7, 13 GW</div>
            </div>
        </div>
    );
});

Bible.displayName = "Bible";

export default Bible;