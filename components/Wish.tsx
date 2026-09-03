"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useWishController } from "@/app/hooks/useWishController";
import StatusPopup from "@/app/sections/StatusPopup";
import WishDetailPopup from "@/app/sections/WishDetailPopup";
import { decodeHtmlEntities } from "@/app/lib/decodeHtmlEntities";
import FadeIn from "@/app/sections/FadeIn";
import "@/app/wish.css";
import BouncyZoom from "@/app/sections/BouncyZoom";

type Wish = {
    name: string;
    message: string;
};

type WishesProps = {
    data?: any;
};

export default function Wishes({ data }: WishesProps) {
    const guestName = data?.dataGuest?.name ?? "";
    var wishes = data?.allPersonalGuestMessages ?? [];

    const [showAllMessages, setShowAllMessages] = useState(false);
    const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

    const {
        isSubmit,
        handleSubmitWish,
        showModal,
        setShowModal,
        modalType,
    } = useWishController({ data });

    const [name, setName] = useState(guestName);
    const [message, setMessage] = useState("");
    const [nameError, setNameError] = useState("");
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        if (guestName) {
            setName(guestName);
        }
    }, [guestName]);

    const handleSend = async () => {
        let hasError = false;

        if (!name.trim()) {
            setNameError("Name is required");
            hasError = true;
        } else {
            setNameError("");
        }

        const wordCount = message
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length;

        if (!message.trim()) {
            setMessageError("Wishes is required");
            hasError = true;
        } else {
            setMessageError("");
        }

        if (hasError) return;

        const result = await handleSubmitWish(
            name.trim(),
            message.trim()
        );

        if (!result) return;

        setMessage("");
    };

    return (
        <div id="wishes" className="w-full relative bg-white">
            {/* Layer 1: base color */}
            <div className="absolute inset-0 bg-[#251001] pointer-events-none" />

            {/* Layer 2: texture, multiply ke base color */}
            <div
                className="absolute inset-0 mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: `url('/images/dresscode_bg_full.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Layer 3: overlay warna tambahan (opacity 0, tinggal naikin kalau perlu) */}
            <div className="absolute inset-0 bg-[#251001] mix-blend-multiply opacity-0 pointer-events-none" />

            <div className="items-center flex flex-col w-full relative z-10">
                <div
                    className="
                        wish
                        flex
                        flex-col
                        items-center
                        text-center
                        mx-auto
                        md:py-[60px_100px]
                        p-[35px_51px_58px]
                        md:w-[592px]
                        w-full
                    "
                >
                    <div className="md:mb-[65px] mb-[35px]">
                        <FadeIn>
                            <div className="title md:pb-[100px] pb-[55px]">
                                Personal Message
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="titlenote w-[428px]">
                                <h2>
                                    Feel free to
                                    <br />
                                    <span>write us a little note!</span>
                                </h2>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="titledesc mx-auto w-[326px] md:w-[380px] mt-5 md:mt-[40px]">
                                Genuinely looking forward to hear from all of you.
                                <br />
                                <span>
                                    A sentence or two would mean the world to us.
                                </span>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="w-full md:w-[594px]">
                        {/* Input nama */}
                        <BouncyZoom>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name..."
                                maxLength={100}
                                required
                                className="
                                w-full
                                border-[1px]
                                border-[#FFFFFF]
                                rounded-[10px]
                                p-[6px_12px]
                                md:px-[24px]
                                md:py-[14px]
                                text-sm
                                text-start
                                bg-transparent
                                focus:outline-none
                                placeholder:text-[#989795]
                                text-[#FFFFFF]
                                md:h-[42px]
                            "
                            />
                        </BouncyZoom>

                        {nameError && (
                            <p className="text-red-500 text-xs text-left w-full pl-[10px] pt-[5px]">
                                {nameError}
                            </p>
                        )}

                        {/* Textarea pesan */}
                        <BouncyZoom>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Leave your wishes here."
                                rows={4}
                                required
                                minLength={5}
                                className="
                                w-full
                                mt-4
                                md:mt-[26px]
                                md:h-[197px]
                                h-[106px]
                                border-[1px]
                                border-[#FFFFFF]
                                rounded-[10px]
                                md:rounded-[20px]
                                p-[7px_12px]
                                md:px-[24px]
                                md:py-[14px]
                                text-sm
                                bg-transparent
                                resize-none
                                focus:outline-none
                                appearance-none
                                placeholder:text-[#989795]
                                text-[#FFFFFF]
                            "
                            />
                        </BouncyZoom>

                        {messageError && (
                            <p className="text-red-500 text-xs text-left w-full pl-[10px] pt-[5px]">
                                {messageError}
                            </p>
                        )}

                        {/* Tombol Send */}
                        <BouncyZoom>
                            <button
                                onClick={handleSend}
                                disabled={isSubmit}
                                className="
                                wish_button
                                w-full
                                bg-[#FFFFFF]
                                text-[#1B1C1D]
                                rounded-[10px]
                                my-4
                                md:mt-[26px]
                                md:mb-[35px]
                                h-[30px]
                                md:h-[42px]
                                flex
                                items-center
                                justify-center
                                gap-2
                                text-sm
                                tracking-wide
                                hover
                                transition
                                disabled:opacity-50
                            "
                            >
                                <Image
                                    src="/ico/ic_send_black.png"
                                    alt="send"
                                    width={14}
                                    height={17}
                                />

                                {isSubmit ? "SENDING..." : "SEND"}
                            </button>
                        </BouncyZoom>

                        {/* Wishlist */}
                        <FadeIn>
                            {!showAllMessages && (
                                <div
                                    className="
                                    wishlist-wrapper
                                    w-full
                                    border-[1px]
                                    border-[#FFFFFF]
                                    rounded-[10px]
                                    pt-[18px]
                                    pb-4
                                    pl-3
                                    pr-1
                                    mb-4
                                    md:pt-[22px]
                                    md:pb-[33px]
                                    md:pl-[24px]
                                    md:pr-[21px]
                                    md:mb-[22px]
                                    max-h-[317px]
                                    md:max-h-[527px]
                                    flex
                                    flex-col
                                    overflow-hidden
                                "
                                >
                                    <div
                                        className="
                                        wishlist
                                        flex-1
                                        min-h-0
                                        overflow-y-auto
                                        text-left
                                        mr-1
                                        custom-scrollbar
                                    "
                                    >
                                        {wishes.length === 0 ? (
                                            <p className="text-center py-10 wish_msg text-[#989795]">
                                                It's quiet here...
                                            </p>
                                        ) : (
                                            wishes.map(
                                                (wish: Wish, i: number) => (
                                                    <div
                                                        key={i}
                                                        className={
                                                            i > 0
                                                                ? "pt-5 border-t border-[#FFFFFF] mt-4"
                                                                : ""
                                                        }
                                                    >
                                                        <p className="wish_name mb-[16px] md:mb-[17px]">
                                                            {wish.name}
                                                        </p>

                                                        <p className="wish_msg line-clamp-4">
                                                            {decodeHtmlEntities(
                                                                wish.message
                                                            )}
                                                        </p>
                                                    </div>
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </FadeIn>

                        {/* All Messages */}
                        {showAllMessages && (
                            <div className="mb-4">
                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-3
                                        max-h-[300px]
                                        md:max-h-[527px]
                                        overflow-y-auto
                                        custom-scrollbar
                                    "
                                >
                                    {wishes.map(
                                        (wish: Wish, i: number) => {
                                            const initials = wish.name
                                                .trim()
                                                .split(/\s+/)
                                                .map(
                                                    (word) => word[0]
                                                )
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase();

                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() =>
                                                        setSelectedWish(wish)
                                                    }
                                                    className="
                                                        bg-[#F8F6EF]
                                                        rounded-[12px]
                                                        overflow-hidden
                                                        flex
                                                        flex-col
                                                        min-h-[200px]
                                                        hover
                                                    "
                                                >
                                                    {/* Content */}
                                                    <div className="flex-1 px-4 pt-5 pb-0 text-left">
                                                        <p className="text-[#4D4D4D] text-xl leading-none mb-3">
                                                            “
                                                        </p>

                                                        <p
                                                            className="
                                                                font-times-new-roman
                                                                text-[12px]
                                                                line-clamp-4
                                                                text-[#1B1C1D]/85
                                                                text-left
                                                                leading-[17px]
                                                            "
                                                        >
                                                            {decodeHtmlEntities(
                                                                wish.message
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div className="w-[40px] border-t border-[#C8CCA9] mx-4 my-5" />

                                                    {/* Name */}
                                                    <div
                                                        className="
                                                            bg-[#F0EBDD]
                                                            border-t
                                                            border-[#DED8C9]
                                                            px-2
                                                            py-2
                                                            flex
                                                            items-center
                                                            gap-3
                                                        "
                                                    >
                                                        <div
                                                            className="
                                                                w-[clamp(28px,3vw,36px)]
                                                                h-[clamp(28px,3vw,36px)]
                                                                rounded-full
                                                                bg-white
                                                                border
                                                                border-[#D8D8D8]
                                                                flex
                                                                items-center
                                                                justify-center
                                                                shrink-0
                                                            "
                                                        >
                                                            <span className="text-[clamp(9px,1vw,12px)] text-[#4D4D4D]">
                                                                {initials}
                                                            </span>
                                                        </div>

                                                        <p
                                                            className="
                                                                wish_name
                                                                text-left
                                                                text-[clamp(11px,1.15vw,16px)]
                                                                truncate
                                                                min-w-0
                                                            "
                                                        >
                                                            {wish.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}

                        <WishDetailPopup
                            wish={selectedWish}
                            onClose={() =>
                                setSelectedWish(null)
                            }
                        />

                        {/* Tombol See all message */}
                        <BouncyZoom>
                            <button
                                onClick={() =>
                                    setShowAllMessages(
                                        !showAllMessages
                                    )
                                }
                                className="
                                wish_button
                                w-full
                                bg-[#FFFFFF]
                                text-[#1B1C1D]
                                rounded-[10px]
                                py-3
                                flex
                                items-center
                                h-[30px]
                                md:h-[42px]
                                justify-center
                                gap-2
                                text-sm
                                tracking-wide
                                hover
                                transition
                            "
                            >
                                <Image
                                    src="/ico/ic_allmsg_black.png"
                                    alt="messages"
                                    width={14}
                                    height={17}
                                />

                                {showAllMessages
                                    ? "BACK"
                                    : "VIEW ALL MESSAGES"}
                            </button>
                        </BouncyZoom>
                    </div>
                </div>

                {showModal && (
                    <StatusPopup
                        type={modalType}
                        title={
                            modalType === "success"
                                ? "WISHES SENT"
                                : "FAILED TO SEND"
                        }
                        messageId={
                            modalType === "success"
                                ? "Ucapan Anda berhasil dikirim."
                                : "Ucapan Anda gagal dikirim. Silakan coba lagi."
                        }
                        messageEn={
                            modalType === "success"
                                ? "Your wishes have been sent successfully."
                                : "Your wishes could not be sent. Please try again."
                        }
                        buttons={[
                            {
                                label: "Close",
                                onClick: () =>
                                    setShowModal(false),
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    );
}