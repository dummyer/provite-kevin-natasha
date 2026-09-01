"use client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useSmartRsvpController } from "@/app/hooks/useSmartRsvpController";
import type { UseSmartRsvpControllerProps } from "@/app/hooks/useSmartRsvpController";
import {
    Loader,
    ConfirmRsvpModal,
    IncompleteRsvpModal,
    IncompleteSmartRsvpModal,
    RsvpClosedModal,
    ConfirmedRsvpModal,
} from "./SmartRsvpFormModals";
import Image from "next/image";

type SmartRsvpControllerValue = ReturnType<typeof useSmartRsvpController>;
const SmartRsvpContext = createContext<SmartRsvpControllerValue | null>(null);

function useSmartRsvpContext() {
    const ctx = useContext(SmartRsvpContext);
    if (!ctx) throw new Error("SmartRsvpForm.* components must be rendered inside <SmartRsvpForm>.");
    return ctx;
}

export function useSmartRsvp() {
    return useSmartRsvpContext();
}

interface SmartRsvpFormProps extends UseSmartRsvpControllerProps {
    children: ReactNode;
}

function SmartRsvpFormRoot({ data, paramUrl, onSubmitRSVP, defaultAttendStatus, children }: SmartRsvpFormProps) {
    const controller = useSmartRsvpController({ data, paramUrl, onSubmitRSVP, defaultAttendStatus });
    return (
        <SmartRsvpContext.Provider value={controller}>
            {children}
        </SmartRsvpContext.Provider>
    );
}

function AttendToggle({ className }: { className?: string }) {
    const { setAttendStatus } = useSmartRsvpContext();
    return (
        <button onClick={() => setAttendStatus(1)} className={className}>
            Hadir
        </button>
    );
}

function NotAttendToggle({ className }: { className?: string }) {
    const { setAttendStatus } = useSmartRsvpContext();
    return (
        <button onClick={() => setAttendStatus(2)} className={className}>
            Tidak Hadir
        </button>
    );
}

function AccordionSection({ className, bgActiveColor }: { className?: string; bgActiveColor?: string }) {
    return null;
}

function SubmitButton({ className }: { className?: string }) {
    const { attendStatus, handleSubmit, isSubmit, confirmed } = useSmartRsvpContext();
    if (attendStatus === 0) return null;

    return (
        <>
            <button onClick={handleSubmit} className={className} disabled={isSubmit || confirmed}>
                {isSubmit
                    ? "Mengirim..."
                    : attendStatus === 1
                        ? "Konfirmasi Hadir"
                        : "Konfirmasi Tidak Hadir"}
            </button>
            <h1 className="rsvp_content info lg:max-w-[529px] max-w-[240px]" style={{ lineHeight: "18px", fontSize: "14px" }}>Jika mengalami kendala dalam konfirmasi kehadiran, silakan hubungi tim bantuan kami.</h1>
            <button
                onClick={() => window.open("https://wa.me/0", "_blank")}
                className="flex items-center gap-[7px] lg:gap-[9px] mt-[20px] 
                                    py-[12px] px-[6px]
                                    lg:py-[3px] lg:px-[53px]
                                    hover rsvp_button cursor-pointer lg:w-[368px] w-[200px] lg:h-[40px] h-[30px] items-center justify-center"
                style={{ backgroundColor: "#12877B", color: "white", borderRadius: "6px" }}
            >
                <Image src="/ico/ic_wa.svg" alt="WhatsApp" width={16} height={16}
                    className="lg:w-[25px] lg:h-[28px]"
                />
                Kirim Pesan Bantuan
            </button>
        </>
    );
}

function Modals() {
    const {
        isSubmit,
        showIncompleteModal, setShowIncompleteModal,
        titleResponseRSVP, failedSubmitMessage, failedEnSubmitMessage,
        showIncompleteRSVPModal, setShowIncompleteRSVPModal,
        showClosedModal, setShowClosedModal, invitationUrl,
        showConfirmModal, setShowConfirmModal, handleRSVP,
        showModal, setShowModal, attendStatus,
    } = useSmartRsvpContext();

    return (
        <>
            {isSubmit && <Loader />}
            {showIncompleteModal && (
                <IncompleteRsvpModal onClose={() => setShowIncompleteModal(false)} title={titleResponseRSVP} indMessage={failedSubmitMessage} enMessage={failedEnSubmitMessage} />
            )}
            {showIncompleteRSVPModal && (
                <IncompleteSmartRsvpModal onClose={() => setShowIncompleteRSVPModal(false)} title={titleResponseRSVP} indMessage={failedSubmitMessage} />
            )}
            {showClosedModal && (
                <RsvpClosedModal onClose={() => setShowClosedModal(false)} whatsappNumber={invitationUrl} />
            )}
            {showConfirmModal && (
                <ConfirmRsvpModal onClose={() => setShowConfirmModal(false)} onConfirm={handleRSVP} />
            )}
            {showModal && (
                <ConfirmedRsvpModal onClose={() => setShowModal(false)} title="RSVP CONFIRMED" status={attendStatus} />
            )}
        </>
    );
}

export const SmartRsvpForm = Object.assign(SmartRsvpFormRoot, {
    AttendToggle,
    NotAttendToggle,
    Accordion: AccordionSection,
    SubmitButton,
    Modals,
});