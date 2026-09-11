"use client";

import { useEffect } from "react";
import BouncyZoom from "@/app/sections/BouncyZoom";
import { useSound } from "@/app/context/SoundContext";

type VideoSoundButtonProps = {
    id: string;
    videoRef: React.RefObject<HTMLVideoElement | HTMLAudioElement | null>;
    mode?: "mute" | "pause"; // "mute" = video (default), "pause" = BGM audio
    canPlay?: boolean; // gerbang eksternal, misal shouldPlay/!isBlurred
};

export default function VideoSoundButton({
    id,
    videoRef,
    mode = "mute",
    canPlay = true,
}: VideoSoundButtonProps) {
    const { activeId, requestUnmute, requestMute } = useSound();
    const isMuted = activeId !== id;

    useEffect(() => {
        const media = videoRef.current;
        if (!media) return;

        if (mode === "pause") {
            const shouldBePlaying = !isMuted && canPlay;
            if (shouldBePlaying) {
                media.muted = false;
                media.play().catch(() => {});
            } else {
                media.pause();
            }
        } else {
            media.muted = isMuted;
        }
    }, [isMuted, videoRef, mode, canPlay]);

    const toggleMute = () => {
        if (isMuted) {
            requestUnmute(id);
        } else {
            requestMute(id, { manual: true });
        }
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