"use client";

import { forwardRef, useRef, useEffect } from "react";
import Image from "next/image";
import CoupleNames from "@/app/sections/CoupleNames";
import "@/app/hero.css";
import VideoSoundButton from "@/app/sections/VideoSoundsButton";

type HeroProps = {
    data: any;
    shouldPlay?: Boolean;
};

const Hero = forwardRef<HTMLElement, HeroProps>(({ data, shouldPlay = true }, ref) => {
    const coupleNames =
        data?.dataEvent?.name ?? "Kevin & Natasha";

    const date =
        data?.dataEvent?.date ?? "2026-10-25";

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && shouldPlay) {
                video.muted = false;
                video.play().catch(() => { });
            } else {
                video.muted = true;
                video.pause();
            }
        };

        if (document.visibilityState === "visible" && shouldPlay) {
            video.muted = false;
            video.play().catch(() => { });
        } else {
            video.muted = true;
            video.pause();
        }

        document.addEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [shouldPlay]);

    return (
        <div
            className="hero relative w-full h-[100vh] overflow-hidden"
            id="home"
        >
            {/* =========================================
                BACKGROUND VIDEO
               ========================================= */}

            <video
                ref={videoRef}
                //autoPlay
                //muted
                loop
                playsInline
                className="
                    absolute
                    inset-0
                    z-0
                    w-full
                    h-full
                    object-cover
                "
            >
                {/* Desktop */}
                <source
                    src="/videos/intro_video.mp4"
                    type="video/mp4"
                    media="(min-width: 768px)"
                />

                {/* Mobile */}
                <source
                    src="/videos/video_2.mp4"
                    type="video/mp4"
                    media="(max-width: 767px)"
                />
            </video>
            <VideoSoundButton videoRef={videoRef} />
            {/* =========================================
                CONTENT
               ========================================= */}

            <div
                className="
                    relative
                    z-10

                    items-center
                    flex
                    flex-col

                    h-[100vh]

                    pt-5
                    lg:pt-[50px]

                    w-full
                "
            >
                {/* Logo */}

                <div>
                    <Image
                        src="/images/logo_hero.png"
                        alt="Logo"
                        width={57}
                        height={54}
                        priority
                        className="
                            lg:w-[96px]
                            lg:h-[92px]
                        "
                    />
                </div>

                {/* Couple Names */}

                <div className="w-full m-auto hero px-[42px]">
                    <div className="title mb-[3px] lg:mb-0">
                        THE WEDDING OF
                    </div>

                    <CoupleNames
                        date={date}
                        fullText={coupleNames}
                    />
                </div>
            </div>

        </div>

    );
});

Hero.displayName = "Hero";

export default Hero;