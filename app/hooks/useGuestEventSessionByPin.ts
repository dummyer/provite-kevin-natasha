"use client";

import { useEffect, useState } from "react";
import { getGuestEventSessionByPinNew } from "@/app/services/event";

/**
 * Ambil data session tamu (by PIN + eventId) pakai pin yang disimpen di
 * localStorage oleh PinPage waktu pertama kali buka link /[id]/[pin].
 */
export function useGuestEventSession(eventId?: string | null) {
  const [sessionData, setSessionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!eventId || typeof window === "undefined") return;

    const pin = localStorage.getItem("pin");
    if (!pin) return;

    let cancelled = false;
    setIsLoading(true);

    getGuestEventSessionByPinNew(pin, eventId)
      .then((session) => {
        if (!cancelled && session) {
          setSessionData(session);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  return { sessionData, isLoading };
}