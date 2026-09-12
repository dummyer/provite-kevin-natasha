"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const POPUP_TRANSITION_MS = 300;

type RSVPButtonProps = {
    visible: boolean;
};

const RSVPButton = ({ visible }: RSVPButtonProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [mountPopup, setMountPopup] = useState(false);
    const hasTriggeredRef = useRef(false); // biar timer cuma jalan sekali, pas pertama kali visible=true

    // Trigger auto show/hide tooltip cuma sekali, pas pertama kali tombol jadi visible
    useEffect(() => {
        if (!visible || hasTriggeredRef.current) return;
        hasTriggeredRef.current = true;

        const showTimer = setTimeout(() => {
            setMountPopup(true);
            requestAnimationFrame(() => setShowPopup(true));
        }, 1500);

        const hideTimer = setTimeout(() => setShowPopup(false), 5000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [visible]);

    // Begitu showPopup jadi false, tunggu transisi kelar baru unmount div-nya
    useEffect(() => {
        if (!showPopup && mountPopup) {
            const unmountTimer = setTimeout(() => setMountPopup(false), POPUP_TRANSITION_MS);
            return () => clearTimeout(unmountTimer);
        }
    }, [showPopup, mountPopup]);

    const scrollToRSVP = () => {
        const el = document.getElementById("rsvp");
        if (el) {
            const offset = 0;
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setShowPopup(false);
    };

    return (
        <div
            className={`
                fixed right-[10px] bottom-[50px] z-[50] w-[45px] h-[45px]
                md:right-[35px]
                md:bottom-[110px]
                transition-opacity duration-300
                ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            {mountPopup && (
                <div
                    className={`
                        absolute
                        right-full
                        top-1/2
                        -translate-y-1/2
                        mr-3
                        bg-white
                        rounded-2xl
                        shadow-lg
                        px-4 py-3
                        w-[220px]
                        transition-all
                        duration-300
                        ${showPopup ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-4 pointer-events-none"}
                    `}
                >
                    <p className="font-bold text-sm text-black leading-tight">
                        Click Here to RSVP.
                    </p>
                    <p className="italic text-xs text-black mt-1 leading-snug">
                        Tap this button to confirm your attendance.
                    </p>
                </div>
            )}

            <button
                onClick={scrollToRSVP}
                className="
                hover
                    w-[35px]
                    h-[35px]
                    md:w-[60px]
                    md:h-[60px]
                    rounded-full
                    bg-white
                    border-2
                    border-[#2A6CF6]
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    shrink-0
                "
                aria-label="Go to RSVP section"
            >
                <Image src="/ico/ic_rsvp_button.png"
                className="md:w-[30px] md:h-[30px]"
                priority alt="RSVP" width={20} height={20} />
            </button>
        </div>
    );
};

export default RSVPButton;