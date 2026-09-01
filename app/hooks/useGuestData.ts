"use client";

import { useEffect, useState } from "react";
import { getCurrentGuest } from "@/app/services/event";

/**
 * Ambil data tamu (nama, pin asli, dll) pakai pin yang disimpen di localStorage
 * oleh PinPage waktu pertama kali buka link /[id]/[pin].
 *
 * Dipakai di Home (buat InvitationPopup) dan RSVP flow.
 */
export function useGuestData(eventUrl?: string | null) {
  const [guestData, setGuestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!eventUrl || typeof window === "undefined") return;

    const pin = localStorage.getItem("pin");
    if (!pin) return;

    let cancelled = false;
    setIsLoading(true);

    getCurrentGuest(eventUrl, pin)
      .then((guest) => {
        if (!cancelled && guest) {
          setGuestData(guest);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventUrl]);

  return { guestData, isLoading };
}