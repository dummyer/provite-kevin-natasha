"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import CoupleNames from "@/app/sections/CoupleNames";
import "@/app/hero.css";

type HeroProps = {
    data: any;
};

const Hero = forwardRef<HTMLElement, HeroProps>(({ data }, ref) => {
    const coupleNames = data?.dataEvent?.name ?? "Kevin & Natasha";
    const date = data?.dataEvent?.date ?? "2026-10-25";
    console.log("Hero data:", data);

    return (
        <div className="hero w-full" id="home">
            <div className="items-center flex flex-col h-[100vh] pt-5 lg:pt-[50px] w-full">
                <div>
                    <Image src="/images/logo_hero.png" alt="Logo" width={57} height={54}
                        className="lg:w-[96px] lg:h-[92px]"
                    />
                </div>

                <div className="w-full m-auto hero">
                    <div className="title">THE WEDDING OF</div>
                    <CoupleNames date={date} fullText={coupleNames} />

                </div>
            </div>
        </div>
    );
});

Hero.displayName = "Hero";

export default Hero;