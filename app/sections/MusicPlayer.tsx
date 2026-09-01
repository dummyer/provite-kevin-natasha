"use client";

import {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
} from "react";

export type MusicPlayerRef = {
    playMusic: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerRef>((_, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const wasPlayingBeforeHidden = useRef(false);

    useImperativeHandle(ref, () => ({
        playMusic: async () => {
            const audio = audioRef.current;

            if (!audio) return;

            try {
                await audio.play();
                setIsPlaying(true);
                setHasTriggered(true);
            } catch (error) {
                console.error("Audio play failed:", error);
            }
        },
    }));

    const toggleMusic = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            await audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    // Pause otomatis saat pindah tab, resume saat balik (kalau sebelumnya lagi main)
    useEffect(() => {
        const handleVisibilityChange = () => {
            const audio = audioRef.current;
            if (!audio) return;

            if (document.hidden) {
                // simpan status sebelum di-pause
                wasPlayingBeforeHidden.current = !audio.paused;
                if (!audio.paused) {
                    audio.pause();
                    setIsPlaying(false);
                }
            } else {
                // balik ke tab, resume kalau tadinya lagi main
                if (wasPlayingBeforeHidden.current && audio.paused) {
                    audio.play().then(() => setIsPlaying(true)).catch((err) => {
                        console.error("Resume failed:", err);
                    });
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/bg_music.mpeg"
                loop
                preload="auto"
            />

            <button
                onClick={toggleMusic}
                className={`
                    hover
        fixed
        right-5
        bottom-5
        z-[80]
        w-[42px]
        h-[42px]
        rounded-full
        bg-[#5F2D1C]
        text-white
        flex
        items-center
        justify-center
        shadow-lg
        transition-opacity
        duration-300
        ${hasTriggered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                aria-hidden={!hasTriggered}
                tabIndex={hasTriggered ? 0 : -1}
            >
                {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <rect x="1" y="0" width="4" height="14" rx="1" />
                        <rect x="9" y="0" width="4" height="14" rx="1" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M2 0.5v13l11-6.5-11-6.5z" />
                    </svg>
                )}
            </button>
        </>
    );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;