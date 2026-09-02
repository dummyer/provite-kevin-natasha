"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import CoupleNames from "@/app/sections/CoupleNames";
import BouncyZoom from "@/app/sections/BouncyZoom";
import "@/app/dresscode.css";

type DresscodeProps = {
    data: any;
};

const Dresscode = forwardRef<HTMLElement, DresscodeProps>(({ data }, ref) => {
    const coupleNames = data?.dataEvent?.name ?? "Kevin & Natasha";
    const date = data?.dataEvent?.date ?? "2026-10-25";

    return (
        <div className="dresscode w-full relative bg-[#F7F7F7]" id="dresscode">
            {/* Layer 1: background image, full opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/images/dresscode_bg.jpg')` }}
            />

            {/* Layer 2: white wash tipis di atas gambar */}
            <div className="absolute inset-0 pointer-events-none" />

            <div className="items-center flex flex-col w-full relative z-10">
                <div className="dresscode__content w-full p-[35px_32px] lg:py-15 text-center">
                    <h3 className="dresscode__title text-sm italic tracking-wide mb-10 lg:mb-15">
                        The Dresscode
                    </h3>

                    <div className="flex items-center justify-center gap-4 lg:gap-[11px]">
                        <div className="flex items-center justify-center gap-[18px] lg:gap-[33px]">
                            {/* Black circle */}
                            <BouncyZoom
                                className="dresscode__circle w-[90px] h-[90px] lg:w-[165px] lg:h-[165px] 
                            pr-[7px]
                            aspect-square shrink-0 rounded-full bg-[#131313] flex items-center justify-end"
                                delay={0}
                            >
                                <span className="colortext lg:hidden">Black</span>
                            </BouncyZoom>

                            {/* Gray circle */}
                            <BouncyZoom
                                className="dresscode__circle w-[90px] h-[90px] lg:w-[165px] lg:h-[165px] 
                            pr-[7px]
                            aspect-square shrink-0 rounded-full bg-[#565656] flex items-center justify-end"
                                delay={0.15}
                            >
                                <span className="colortext lg:hidden">Gray</span>
                            </BouncyZoom>
                        </div>

                        {/* Strictly no batik/white */}
                        <BouncyZoom
                            className="flex flex-col items-center justify-between h-[90px] lg:gap-[14px]"
                            delay={0.3}
                        >
                            <div className="dresscode__cross mt-[10px] lg:mt-[-18px] relative w-[51px] h-[51px] lg:w-[95px] lg:h-[95px] shrink-0">
                                <div
                                    className="absolute top-1/2 left-1/2 h-[1.54px] bg-[#565656]"
                                    style={{ width: "141.42%", transform: "translate(-50%, -50%) rotate(45deg)" }}
                                />
                                <div
                                    className="absolute top-1/2 left-1/2 h-[1.54px] bg-[#565656]"
                                    style={{ width: "141.42%", transform: "translate(-50%, -50%) rotate(-45deg)" }}
                                />
                            </div>
                            <p className="crossdesc lg:w-[245px]">
                                Strictly
                                <br />
                                <span>No Batik and No White.</span>
                            </p>
                        </BouncyZoom>
                    </div>

                    <p className="dresscode__note mt-[27px] lg:mt-15 max-w-[420px] mx-auto">
                        It would be a huge pleasure for us if you could <br></br>
                        <span className="leading-[12px] lg:leading-[22px]">kindly wear a{" "}</span>
                        <span className="font-bold leading-[12px] lg:leading-[22px]">suit</span> or{" "}
                        <span className="font-bold leading-[12px] lg:leading-[22px]">dress</span> within these color theme.
                    </p>
                </div>
            </div>
        </div>
    );
});

Dresscode.displayName = "Dresscode";

export default Dresscode;