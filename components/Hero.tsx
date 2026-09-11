"use client";

import { forwardRef, useRef, useEffect } from "react";
import Image from "next/image";
import CoupleNames from "@/app/sections/CoupleNames";
import "@/app/hero.css";
import VideoSoundButton from "@/app/sections/VideoSoundsButton";

const USE_BGM = true;

type HeroProps = {
    data: any;
    shouldPlay?: Boolean;
};

const Hero = forwardRef<HTMLElement, HeroProps>(({ data, shouldPlay = true }, ref) => {
    const coupleNames = data?.dataEvent?.name ?? "Kevin & Natasha";
    const date = data?.dataEvent?.date ?? "2026-10-25";

    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const soundRef = USE_BGM ? audioRef : videoRef;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && shouldPlay) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        };

        handleVisibilityChange();

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [shouldPlay]);

    return (
        <div className="hero relative w-full h-[100vh] overflow-hidden" id="home">
            <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="absolute inset-0 z-0 w-full h-full object-cover"
            >
                <source src="/videos/video_2.mp4" type="video/mp4" />
            </video>

            {USE_BGM && (
                <audio ref={audioRef} loop muted>
                    <source src="/music/bgm.mp3" type="audio/mpeg" />
                </audio>
            )}

            <VideoSoundButton
                id="hero"
                videoRef={soundRef}
                mode={USE_BGM ? "pause" : "mute"}
                canPlay={Boolean(shouldPlay)}
            />

            <div className="relative z-10 items-center flex flex-col h-[100vh] pt-5 lg:pt-[50px] w-full">
                <div>
                    <Image
                        src="/images/logo_putih.webp"
                        alt="Logo"
                        width={57}
                        height={54}
                        priority
                        className="lg:w-[96px] lg:h-[92px]"
                    />
                </div>

                <div className="w-full m-auto hero px-[42px]">
                    <div className="title mb-[3px] lg:mb-0">THE WEDDING OF</div>
                    <CoupleNames date={date} fullText={coupleNames} />
                </div>
            </div>
        </div>
    );
});

Hero.displayName = "Hero";

export default Hero;