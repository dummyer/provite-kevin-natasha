"use client";

import { useCallback, useEffect, useState } from "react";
import { getAllPersonalGuestMessages } from "@/app/services/event";

export function useAllPersonalGuestMessages(eventId?: string | null) {
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMessages = useCallback(async () => {
        if (!eventId) return;

        try {
            setIsLoading(true);

            const result = await getAllPersonalGuestMessages(eventId);

            if (result) {
                setMessages(result);
            }
        } catch (error) {
            console.error("Get all personal guest messages:", error);
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        if (!eventId) return;

        // fetch pertama
        fetchMessages();

        // refresh setiap 5 detik
        const interval = setInterval(() => {
            fetchMessages();
        }, 5000);

        return () => clearInterval(interval);
    }, [eventId, fetchMessages]);

    return {
        messages,
        isLoading,
        refreshMessages: fetchMessages,
    };
}