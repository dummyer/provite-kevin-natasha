"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

type SoundContextType = {
    activeId: string | null;
    requestUnmute: (id: string) => void;
    requestMute: (id: string, options?: { manual?: boolean }) => void;
    requestPause: (id: string) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

type SoundProviderProps = {
    children: React.ReactNode;
    defaultActiveId?: string | null;
};

export function SoundProvider({
    children,
    defaultActiveId = "hero",
}: SoundProviderProps) {
    const [activeId, setActiveId] = useState<string | null>(defaultActiveId);
    const previousActiveIdRef = useRef<string | null>(null);
    const mutedByUserRef = useRef<Set<string>>(new Set());

    const requestUnmute = useCallback((id: string) => {
        setActiveId((current) => {
            if (current !== id) {
                previousActiveIdRef.current = current;
            }
            return id;
        });
        mutedByUserRef.current.delete(id);
    }, []);

    const requestMute = useCallback((id: string, options?: { manual?: boolean }) => {
        if (options?.manual) {
            mutedByUserRef.current.add(id);
        }
        setActiveId((current) => (current === id ? null : current));
    }, []);

    const requestPause = useCallback((id: string) => {
        setActiveId((current) => {
            if (current !== id) return current;

            const prev = previousActiveIdRef.current;
            previousActiveIdRef.current = null;

            if (prev && !mutedByUserRef.current.has(prev)) {
                return prev;
            }
            return null;
        });
    }, []);

    return (
        <SoundContext.Provider value={{ activeId, requestUnmute, requestMute, requestPause }}>
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