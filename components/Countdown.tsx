"use client";

import { useEffect, useMemo, useState } from "react";
import "@/app/countdown.css";
import { getEventTimestamp, formatEventDateParts } from "@/app/lib/date";

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
        <div className="w-full h-[522px] relative bg-white" id="countdown">
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none grayscale"
                style={{ backgroundImage: `url('/images/countdown_bg.png')` }}
            />
            <div className="countdown relative flex flex-col 
            p-[50px_46px]
            justify-between h-full w-full">
                <div className="title text-center w-[274px] mx-auto">
                    From all the years of knowing each other,
                    <br></br>
                    now the countdown to forever finally begins.
                </div>
                {/* Countdown grid */}
                <div className="mb-[50px] lg:mb-[67px] h-[32px] lg:h-[67px] w-full mx-auto lg:mt-[17px]">
                    <div className="flex justify-between w-full 
                                gap-[7px]">
                        {items.map((it) => (
                            <div
                                key={it.label}
                                className="countdown_container flex flex-col items-center justify-center text-center z-10"
                            >
                                <div className="countdown_timer_container 
                                rounded-[20px]
                                full
                                bg-[#FFFFFF]
                                ">
                                    <h2 className="countdown_timer my-auto">
                                        {it.value}
                                    </h2>
                                </div>

                                <div className="countdown_timer label">
                                    {it.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}