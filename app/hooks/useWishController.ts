"use client";

import { useState } from "react";
import { submitPersonalGuestMessage } from "@/app/services/event";

export interface UseWishControllerProps {
    data?: any;
}

export function useWishController({
    data,
}: UseWishControllerProps) {
    const [isSubmit, setIsSubmit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"success" | "warning">("success");

    const handleSubmitWish = async (
        name: string,
        message: string
    ) => {
        setIsSubmit(true);

        try {
            const payload = {
                dataContent: data?.dataContent,
                name,
                message,
            };

            const result = await submitPersonalGuestMessage(payload);

            if (!result || !result.status) {
                console.error("Submit wish failed:", result);

                setModalType("warning");
                setShowModal(true);

                return null;
            }

            setModalType("success");
            setShowModal(true);

            return result;
        } catch (err) {
            console.error("Submit wish error:", err);

            setModalType("warning");
            setShowModal(true);

            return null;
        } finally {
            setIsSubmit(false);
        }
    };

    return {
        isSubmit,
        handleSubmitWish,

        showModal,
        setShowModal,

        modalType,
    };
}