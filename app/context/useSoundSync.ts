"use client";

import { useEffect, useRef } from "react";
import { useSound } from "@/app/context/SoundContext";

export function useSoundSync(
    id: string,
    videoRef: React.RefObject<HTMLVideoElement | null>,
    options?: {
        listenNativeControls?: boolean;
        unmuteOnPlay?: boolean;
        restoreOnPause?: boolean; // <-- baru
    }
) {
    const { activeId, requestUnmute, requestMute, requestPause } = useSound();
    const isMuted = activeId !== id;
    const hasAutoUnmutedRef = useRef(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = isMuted;
    }, [isMuted, videoRef]);

    useEffect(() => {
        if (!options?.listenNativeControls) return;
        const video = videoRef.current;
        if (!video) return;

        const handleVolumeChange = () => {
            // cuma pengaruh ke global kalau video LAGI PLAYING (bukan paused)
            if (video.paused) return;

            if (!video.muted) {
                requestUnmute(id);
            } else if (activeId === id) {
                requestMute(id, { manual: true });
            }
        };

        video.addEventListener("volumechange", handleVolumeChange);
        return () => video.removeEventListener("volumechange", handleVolumeChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef, id, requestUnmute, requestMute, options?.listenNativeControls]);

    useEffect(() => {
        if (!options?.unmuteOnPlay) return;
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => {
            if (hasAutoUnmutedRef.current) return;
            hasAutoUnmutedRef.current = true;
            requestUnmute(id);
        };

        video.addEventListener("play", handlePlay);
        return () => video.removeEventListener("play", handlePlay);
    }, [videoRef, id, requestUnmute, options?.unmuteOnPlay]);

    useEffect(() => {
        if (!options?.restoreOnPause) return;
        const video = videoRef.current;
        if (!video) return;

        const handlePause = () => {
            requestPause(id);
        };

        video.addEventListener("pause", handlePause);
        return () => video.removeEventListener("pause", handlePause);
    }, [videoRef, id, requestPause, options?.restoreOnPause]);
}