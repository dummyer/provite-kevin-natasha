"use client";
import StatusPopup from "@/app/sections/StatusPopup";

const Loader = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent" />
    </div>
);

const ConfirmRsvpModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => (
    <StatusPopup
        type="question"
        title="CONFIRM RSVP"
        messageId="Apakah Anda yakin dengan pilihan RSVP ini? Silakan lanjutkan untuk menyimpan konfirmasi Anda."
        messageEn="Are you sure about your RSVP selection? Please proceed to submit your confirmation."
        buttons={[
            { label: "Close", onClick: onClose },
            { label: "Confirm", variant: "primary", onClick: onConfirm },
        ]}
    />
);

const IncompleteRsvpModal = ({
    onClose,
    title = "INCOMPLETE RSVP",
    indMessage,
    enMessage,
}: {
    onClose: () => void;
    title: string;
    indMessage: string;
    enMessage: string;
}) => (
    <StatusPopup
        type="warning"
        title={title}
        messageId={indMessage || "Mohon lengkapi data RSVP Anda sebelum melanjutkan."}
        messageEn={enMessage || "Please complete your RSVP details before proceeding."}
        buttons={[{ label: "Close", onClick: onClose }]}
    />
);

const IncompleteSmartRsvpModal = ({
    onClose,
    title = "INCOMPLETE RSVP",
    indMessage,
}: {
    onClose: () => void;
    title: string;
    indMessage: string;
}) => (
    <StatusPopup
        type="warning"
        title={title}
        messageId={indMessage || "Mohon lengkapi data RSVP Anda sebelum melanjutkan."}
        messageEn=""
        buttons={[{ label: "Close", onClick: onClose }]}
    />
);

const RsvpClosedModal = ({ onClose, whatsappNumber }: { onClose: () => void; whatsappNumber: string }) => (
    <StatusPopup
        type="warning"
        title="RSVP CLOSED"
        messageId="Reservasi telah ditutup, terima kasih atas perhatian Anda. Jika membutuhkan bantuan, tim kami siap membantu."
        messageEn="Reservations are now closed. Thank you for your attention. If you need any assistance, our team is here to help."
        buttons={[
            { label: "Close", onClick: onClose },
            { label: "Chat with Our Team", variant: "primary", onClick: () => window.open(whatsappNumber, "_blank") },
        ]}
    />
);

const ConfirmedRsvpModal = ({
    onClose,
    title = "RSVP CONFIRMED",
    status,
}: {
    onClose: () => void;
    title: string;
    status: number;
}) => (
    <StatusPopup
        type="success"
        title={title}
        messageId={
            status === 1
                ? "Konfirmasi kehadiran Anda telah kami terima, kami menantikan kehadiran Anda. Terima kasih atas konfirmasi Anda."
                : "Konfirmasi ketidakhadiran Anda telah kami terima, terima kasih atas respon Anda. Kami menghargai pemberitahuan Anda."
        }
        messageEn={
            status === 1
                ? "Your attendance has been confirmed, we look forward to welcoming you. Thank you for your confirmation."
                : "Your response has been received, thank you for your confirmation. We appreciate your response."
        }
        buttons={[{ label: "Close", onClick: onClose }]}
    />
);

export {
    Loader,
    ConfirmRsvpModal,
    IncompleteRsvpModal,
    IncompleteSmartRsvpModal,
    RsvpClosedModal,
    ConfirmedRsvpModal,
};