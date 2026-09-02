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
import FadeIn from "../sections/FadeIn";
import BouncyZoom from "../sections/BouncyZoom";

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
            ATTEND
        </button>
    );
}

function NotAttendToggle({ className }: { className?: string }) {
    const { setAttendStatus } = useSmartRsvpContext();
    return (
        <button onClick={() => setAttendStatus(2)} className={className}>
            UNABLE TO ATTEND
        </button>
    );
}

function AccordionSection({ className, bgActiveColor }: { className?: string; bgActiveColor?: string }) {
    return null;
}

function SubmitButton({ className }: { className?: string }) {
    const { attendStatus, handleRSVP, isSubmit, confirmed } = useSmartRsvpContext();
    if (attendStatus === 0) return null;

    return (
        <>
            <BouncyZoom>
                <button
                    onClick={handleRSVP}
                    className={className}
                    disabled={isSubmit}
                >
                    <span
                        key={isSubmit ? "loading" : attendStatus}
                        className={`text-center leading-[15px] lg:leading-[21.78px] my-auto ${isSubmit ? "mt-[14px] lg:mt-[18px]" : attendStatus === 1 ? "mt-[14px] lg:mt-[20px]" : "mt-2 lg:mt-[10px]"}`}
                    >
                        {isSubmit ? (
                            "Submiting..."
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
            </BouncyZoom>
            <FadeIn>
                <p className="rsvp_assist_label h-[26px] lg:h-[47px] 
            lg:max-w-[529px] max-w-[240px]">
                    If you need assistance with your RSVP,<br></br>
                    please contact our support team.
                </p>
            </FadeIn>
            <BouncyZoom>
                <button
                    onClick={() => window.open("https://wa.me/6281998478131", "_blank")}
                    className="flex items-center gap-[7px] lg:gap-[9px] 
                                    mt-[25px] lg:mt-[30px]
                                    
                                    hover rsvp_button cursor-pointer 
                                    
                                    w-[160px] h-[30px]
                                    lg:w-[234px] lg:h-[44px] 
                                    items-center justify-center
                                    rounded-[55px]
                                    "
                    style={{ backgroundColor: "#12877B", color: "white", lineHeight: '15px' }}
                >
                    <Image src="/ico/ic_wa.svg" alt="WhatsApp" width={16} height={16}
                        className="lg:w-[25px] lg:h-[28px]"
                    />
                    <span className="mt-1"> CHAT SUPPORT</span>
                </button>
            </BouncyZoom>
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