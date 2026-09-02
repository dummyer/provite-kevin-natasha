"use client";

import Image from "next/image";
import { useEffect } from "react";
import { decodeHtmlEntities } from "@/app/lib/decodeHtmlEntities";

export type WishDetail = {
    name: string;
    message: string;
};

type WishDetailPopupProps = {
    wish: WishDetail | null;
    onClose: () => void;
};

export default function WishDetailPopup({
    wish,
    onClose,
}: WishDetailPopupProps) {
    useEffect(() => {
        if (!wish) return;

        // Lock scroll halaman belakang
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            // Balikin seperti semula setelah popup ditutup
            document.body.style.overflow = originalOverflow;
        };
    }, [wish]);

    if (!wish) return null;

    const initials = wish.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className="
                fixed inset-0
                z-[100]
                flex items-center justify-center
                bg-black/40
                px-5
            "
        >
            <div
                className="
                    relative
                    w-full
                    max-w-[420px]
                    max-h-[85vh]
                    bg-[#F8F6EF]
                    rounded-[15px]
                    overflow-hidden
                    shadow-2xl
                    flex flex-col
                "
            >
                {/* Header */}
                <div className="px-8 pt-10 text-center shrink-0">

                    {/* Initial */}
                    <div
                        className="
                            w-[80px] h-[80px]
                            mx-auto
                            rounded-full
                            border border-[#D8CBAA]
                            bg-[#F5F0E4]
                            flex items-center justify-center
                        "
                    >
                        <span className="font-times-new-roman text-[28px] text-[#4D4D4D]">
                            {initials}
                        </span>
                    </div>

                    {/* Name */}
                    <h3
                        className="
                            font-times-new-roman
                            text-[25px]
                            text-[#0D3448]
                            mt-8
                        "
                    >
                        {wish.name}
                    </h3>

                    {/* Separator */}
                    <div className="w-[60px] h-[3px] bg-[#D8CBAA] mx-auto mt-3" />

                    {/* Quote */}
                    <p
                        className="
                            text-[#D8D8D8]
                            text-[28px]
                            leading-none
                            mt-7
                            mb-5
                        "
                    >
                        "
                    </p>
                </div>

                {/* Message - hanya bagian ini yang scroll */}
                <div className="flex-1 overflow-y-auto px-8 min-h-0 custom-scrollbar">
                    <p
                        className="
                            font-times-new-roman
                            text-[15px]
                            leading-[24px]
                            text-[#1B1C1D]/85
                            text-left
                            pb-6
                        "
                    >
                        { decodeHtmlEntities(wish.message) }
                    </p>
                </div>

                {/* Close */}
                <div className="px-8 pt-5 pb-8 shrink-0">
                    <button
                        onClick={onClose}
                        className="
                            wish_button
                            w-full
                            py-3
                            rounded-[10px]
                            bg-[#5F2D1C]
                            text-white
                            font-times-new-roman
                            text-[15px]
                            font-bold
                            hover
                        "
                    >
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
}