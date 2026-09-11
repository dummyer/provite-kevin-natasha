"use client";

import { useEffect } from "react";
import BouncyZoom from "@/app/sections/BouncyZoom";
import { useSound } from "@/app/context/SoundContext";

type VideoSoundButtonProps = {
    id: string;
    videoRef: React.RefObject<HTMLVideoElement | HTMLAudioElement | null>;
    mode?: "mute" | "pause";
    canPlay?: boolean;
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

    // pause pas tab di-hide, lanjut play lagi pas balik (kalau mode "pause")
    useEffect(() => {
        if (mode !== "pause") return;
        const media = videoRef.current;
        if (!media) return;

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                media.pause();
            } else {
                const shouldBePlaying = !isMuted && canPlay;
                if (shouldBePlaying) {
                    media.play().catch(() => {});
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [mode, videoRef, isMuted, canPlay]);

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