"use client";

import { useState } from "react";
import BouncyZoom from "@/app/sections/BouncyZoom";

type VideoSoundButtonProps = {
    videoRef: React.RefObject<HTMLVideoElement | null>;
};

export default function VideoSoundButton({
    videoRef,
}: VideoSoundButtonProps) {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    return (
        <BouncyZoom
            className="fixed right-[20px] bottom-[20px] z-50"
            delay={0.5}
        >
            <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="
                    md:w-[60px]
                    md:h-[60px]
                    md:text-[30px]

                    w-[35px]
                    h-[35px]
                    text-[20px]

                    rounded-full

                    bg-black/60
                    backdrop-blur-sm

                    flex
                    items-center
                    justify-center

                    text-white

                    border
                    border-white/40

                    cursor-pointer
                    transition-transform
                    duration-200
                    hover:scale-110
                    active:scale-90
                "
            >
                {isMuted ? "🔇" : "🔊"}
            </button>
        </BouncyZoom>
    );
}