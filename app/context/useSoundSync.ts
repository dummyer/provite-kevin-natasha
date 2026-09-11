"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/app/context/SoundContext";

export function useSoundSync(
    id: string,
    videoRef: React.RefObject<HTMLVideoElement | null>,
    options?: {
        listenNativeControls?: boolean;
        unmuteOnPlay?: boolean;
    }
) {
    const { activeId, requestUnmute, requestMute } = useSound();
    const isMuted = activeId !== id;
    const hasAutoUnmutedRef = useRef(false);

    // video ini ikut ke-mute/unmute kalau video LAIN jadi active
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = isMuted;
    }, [isMuted, videoRef]);

    // dengerin native controls (mute/unmute manual dari player bawaan browser)
    useEffect(() => {
        if (!options?.listenNativeControls) return;
        const video = videoRef.current;
        if (!video) return;

        const handleVolumeChange = () => {
            if (!video.muted) {
                requestUnmute(id);
            } else if (activeId === id) {
                requestMute(id);
            }
        };

        video.addEventListener("volumechange", handleVolumeChange);
        return () => video.removeEventListener("volumechange", handleVolumeChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef, id, requestUnmute, requestMute, options?.listenNativeControls]);

    // cuma sekali: pas play PERTAMA kali, bantu unmute otomatis
    useEffect(() => {
        if (!options?.unmuteOnPlay) return;
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            if (hasAutoUnmutedRef.current) return; // udah pernah -> gak diulang
            hasAutoUnmutedRef.current = true;
            requestUnmute(id);
        };

        video.addEventListener("play", handlePlay);
        return () => video.removeEventListener("play", handlePlay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef, id, requestUnmute, options?.unmuteOnPlay]);
}