"use client";

import { useState } from "react";
import { submitRSVP } from "@/app/services/event";

export interface UseSmartRsvpControllerProps {
  data: any;
  paramUrl?: string;
  onSubmitRSVP?: (result: { attending: boolean }) => void;
  defaultAttendStatus?: number;
}

export function useSmartRsvpController({
  data,
  paramUrl = "",
  onSubmitRSVP,
  defaultAttendStatus = 0,
}: UseSmartRsvpControllerProps) {
  const [attendStatus, setAttendStatusRaw] = useState<number>(defaultAttendStatus);
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [showIncompleteRSVPModal, setShowIncompleteRSVPModal] = useState(false);
  const [showClosedModal, setShowClosedModal] = useState(false);

  const [titleResponseRSVP, setTitleResponseRSVP] = useState("INCOMPLETE RSVP");
  const [failedSubmitMessage, setFailedSubmitMessage] = useState("");
  const [failedEnSubmitMessage, setFailedEnSubmitMessage] = useState("");

  const guestData = data?.dataGuest ?? null;
  const invitationUrl = data?.dataEvent?.invitationWAUrl
    ? `https://wa.me/${String(data.dataEvent.invitationWAUrl).replace(/\D/g, "")}`
    : "https://wa.me/0";

  // Setiap kali user ganti pilihan attend/unable (bahkan setelah RSVP
  // sebelumnya sudah confirmed), reset `confirmed` balik ke false biar
  // area konfirmasi & tombol submit balik aktif untuk pilihan yang baru.
  const setAttendStatus = (status: number) => {
    setAttendStatusRaw(status);
    setConfirmed(false);
  };

  // klik tombol "Konfirmasi Hadir/Tidak Hadir" -> munculin popup "yakin?" dulu
  const handleSubmit = () => {
    if (attendStatus === 0) return;
    setShowConfirmModal(true);
  };

  // klik "Confirm" di popup -> submit
  const handleRSVP = async () => {
    setShowConfirmModal(false);
    setIsSubmit(true);

    try {
      const payload = {
        attending: attendStatus === 1,
        attendStatus,
        ...data,
      };

      const result = await submitRSVP(payload);

      if (!result || !result.status) {
        console.error("RSVP submit error: empty/invalid response from submitRSVP", result);
        setConfirmed(true);
        setShowModal(true);
        return;
      }

      switch (result.status) {
        case "confirmed":
          setConfirmed(true);
          setShowModal(true);
          onSubmitRSVP?.(payload);
          break;

        case "unavailable":
          setTitleResponseRSVP("RSVP UNAVAILABLE");
          setFailedSubmitMessage("Mohon maaf, kuota tamu untuk sesi ini telah terpenuhi. Silakan hubungi tim kami untuk informasi lebih lanjut.");
          setFailedEnSubmitMessage("We apologize, guest capacity for this session has been reached. Please contact our team for further assistance.");
          setShowIncompleteModal(true);
          break;

        case "session":
          setTitleResponseRSVP("SESSION REQUIRED");
          setFailedSubmitMessage("Pilihan sesi acara masih belum ditentukan. Mohon pilih minimal satu sesi yang akan dihadiri.");
          setFailedEnSubmitMessage("Some session selections are still missing. Please select at least one session to attend.");
          setShowIncompleteModal(true);
          break;

        case "invitation":
          setTitleResponseRSVP("INVITATION ONLY");
          setFailedSubmitMessage("Undangan ini diperuntukkan bagi tamu yang terdaftar, mohon gunakan link undangan yang sesuai.");
          setFailedEnSubmitMessage("This invitation is intended for registered guests.");
          setShowIncompleteModal(true);
          break;

        case "closed":
          setShowClosedModal(true);
          break;

        default:
          setTitleResponseRSVP("INCOMPLETE RSVP");
          setFailedSubmitMessage("Mohon lengkapi data RSVP Anda sebelum melanjutkan.");
          setFailedEnSubmitMessage("Please complete your RSVP details before proceeding.");
          setShowIncompleteRSVPModal(true);
      }
    } catch (err) {
      console.error("RSVP submit error:", err);
      setTitleResponseRSVP("INCOMPLETE RSVP");
      setFailedSubmitMessage("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
      setFailedEnSubmitMessage("Something went wrong while submitting. Please try again.");
      setShowIncompleteRSVPModal(true);
    } finally {
      setIsSubmit(false);
    }
  };

  return {
    guestData,
    paramUrl,
    invitationUrl,
    attendStatus,
    setAttendStatus,
    isSubmit,
    confirmed,
    handleSubmit,
    handleRSVP,
    showConfirmModal, setShowConfirmModal,
    showModal, setShowModal,
    showIncompleteModal, setShowIncompleteModal,
    showIncompleteRSVPModal, setShowIncompleteRSVPModal,
    showClosedModal, setShowClosedModal,
    titleResponseRSVP,
    failedSubmitMessage,
    failedEnSubmitMessage,
  };
}