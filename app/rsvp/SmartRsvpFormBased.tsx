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
            <span className="relative top-[0px]">ATTEND</span>
        </button>
    );
}

function NotAttendToggle({ className }: { className?: string }) {
    const { setAttendStatus } = useSmartRsvpContext();
    return (
        <button onClick={() => setAttendStatus(2)} className={className}>
            <span className="relative top-[0px]">UNABLE TO ATTEND</span>
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
            <button
                onClick={handleSubmit}
                className={className}
                disabled={isSubmit}
            >
                <span
                    key={isSubmit ? "loading" : attendStatus}
                    className="block text-center lg:leading-[22px] relative top-[1px]"
                >
                    {isSubmit ? (
                        "Mengirim..."
                    ) : attendStatus === 1 ? (
                        "CONFIRM ATTEND"
                    ) : (
                        <>
                            CONFIRM UNABLE
                            <br />
                            TO ATTEND
                        </>
                    )}
                </span>
            </button>
            <h1 className="rsvp_content info">
                If you need assistance with your RSVP,
                <br></br>
                please contact our support team.
            </h1>
            <button
                onClick={() => window.open("https://wa.me/6281998478131", "_blank")}
                className="flex items-center gap-[7px] lg:gap-[9px] mt-[20px] lg:mt-[30px] 
                                    py-[12px] px-[6px]
                                    hover rsvp_button cursor-pointer 
                                    lg:w-[230px] w-[160px] lg:h-[40px] h-[30px] items-center justify-center"
                style={{ backgroundColor: "#12877B", color: "white", borderRadius: "55px" }}
            >
                <Image src="/ico/ic_wa.svg" alt="WhatsApp" width={16} height={16}
                    className="lg:w-[23px] lg:h-[23px] "
                />
                <span className="relative top-[2px]">
                    CHAT SUPPORT
                </span>

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