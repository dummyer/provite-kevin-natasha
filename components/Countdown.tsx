"use client";

import { useEffect, useMemo, useState } from "react";
import "@/app/countdown.css";
import { getEventTimestamp, formatEventDateParts } from "@/app/lib/date";
import FadeIn from "@/app/sections/FadeIn";
import BouncyZoom from "@/app/sections/BouncyZoom";

function pad(n: number) {
    return String(n).padStart(2, "0");
}

interface CountdownProps {
    data: any;
}

export default function Countdown({ data }: CountdownProps) {
    //const targetMs = useMemo(() => new Date("2026-08-25T00:00:00").getTime(), []);
    const targetMs = useMemo(() => getEventTimestamp(data?.dataEvent?.date), [data?.dataEvent?.date]);
    const [diff, setDiff] = useState<number | null>(null);

    useEffect(() => {
        const tick = () => setDiff(targetMs - Date.now());
        tick();
        const t = setInterval(tick, 1000);
        return () => clearInterval(t);
    }, [targetMs]);

    const safe = diff ?? 0;
    const clamped = Math.max(0, safe);

    const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
    const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((clamped / (1000 * 60)) % 60);
    const seconds = Math.floor((clamped / 1000) % 60);

    const items = [
        { label: "Days", value: pad(days) },
        { label: "Hour", value: pad(hours) },
        { label: "Minutes", value: pad(minutes) },
        { label: "Seconds", value: pad(seconds) },
    ];

    const dateParts = useMemo(() => formatEventDateParts(data?.dataEvent?.date), [data?.dataEvent?.date]);

    return (
        <div className="w-full h-[522px] lg:h-[100vh] relative bg-white" id="date">
            {/* Background full-bleed, TANPA padding */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none grayscale"
                style={{ backgroundImage: `url('/images/countdown_bg.png')` }}
            />

            {/* Content, padding ditaruh DI SINI */}
            <div className="countdown relative flex flex-col justify-between h-full w-full py-[50px] lg:py-[100px]">
                <FadeIn>
                    <div className="title text-center w-[274px] lg:w-[413px] mx-auto">
                        From all the years of knowing each other,
                        <br></br>
                        <span> now the countdown to forever finally begins.</span>
                    </div>
                </FadeIn>
                {/* Countdown grid */}
                <div className="w-full mx-auto lg:mt-[17px]">
                    <div className="flex w-full gap-[7px] lg:gap-[14px] justify-center">
                        {items.map((it, index) => (
                            <BouncyZoom
                                key={it.label}
                                className="countdown_container flex flex-col items-center justify-center text-center z-10"
                                delay={index * 0.15}
                            >
                                <div className="countdown_timer_container 
                                flex items-center justify-center
                                rounded-[20px]
                                lg:rounded-[41px]
                                w-[70px]
                                h-[70px]
                                lg:w-[145px]
                                lg:h-[145px]
                                bg-[#FFFFFF]
                                mb-3
                                lg:mb-[26px]
                            ">
                                    <h2 className="countdown_timer my-auto">
                                        {it.value}
                                    </h2>
                                </div>

                                <div className="countdown_timer label">
                                    {it.label}
                                </div>
                            </BouncyZoom>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}