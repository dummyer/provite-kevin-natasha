"use client";

import { createContext, useContext, useState, useCallback } from "react";

type SoundContextType = {
    activeId: string | null;
    requestUnmute: (id: string) => void;
    requestMute: (id: string) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

type SoundProviderProps = {
    children: React.ReactNode;
    defaultActiveId?: string | null;
};

export function SoundProvider({
    children,
    defaultActiveId = "hero", // <-- default: hero yang bersuara duluan
}: SoundProviderProps) {
    const [activeId, setActiveId] = useState<string | null>(defaultActiveId);

    const requestUnmute = useCallback((id: string) => {
        setActiveId(id);
    }, []);

    const requestMute = useCallback((id: string) => {
        setActiveId((current) => (current === id ? null : current));
    }, []);

    return (
        <SoundContext.Provider value={{ activeId, requestUnmute, requestMute }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const ctx = useContext(SoundContext);
    if (!ctx) {
        throw new Error("useSound harus dipakai di dalam <SoundProvider>");
    }
    return ctx;
}