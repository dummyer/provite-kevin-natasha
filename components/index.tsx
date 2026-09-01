"use client";

import InvitationPopup from "@/app/sections/InvitationPopup";
import Menu from "@/app/sections/Menu";
import StatusPopup from "@/app/sections/StatusPopup";
import type { PopupState } from "@/app/types/popup";
import { useEffect, useRef, useState } from "react";
import { useGuestData } from "@/app/hooks/useGuestData";
import { useGuestEventSession } from "@/app/hooks/useGuestEventSessionByPin";
import { useAllPersonalGuestMessages } from "@/app/hooks/useAllPersonalGuestMessages";
import { useImagePreloader } from "@/app/hooks/useImagePreloader";
import Image from "next/image";
import SectionMotif from "@/app/sections/SectionMotif";
import MusicPlayer, {
  type MusicPlayerRef,
} from "@/app/sections/MusicPlayer";
import Rsvp from "./RSVP";
import Gift from "./Gift";
import Countdown from "./Countdown";
import Hero from "./Hero";
import Bible from "./Bible";
import Profile from "./Profile";
import Gallery1 from "./Gallery1";

type ActivePopup =
  | {
    type: "invitation";
  }
  | {
    type: "status";
    data: NonNullable<PopupState>;
  }
  | null;

const CRITICAL_IMAGES = [
  ""
];



export default function Home({
  data,
}: {
  data: any;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  // Popup pertama yang muncul saat halaman dibuka
  const [activePopup, setActivePopup] = useState<ActivePopup>({
    type: "invitation",
  });

  //const isBlurred = activePopup !== null;
  const isBlurred = false;
  

  // Fetch data tamu (nama, pin asli) pakai pin dari localStorage.
  // Hasilnya di-merge ke `data` sebelum diteruskan ke RSVP
  const { guestData, isLoading: isGuestLoading } = useGuestData(data?.dataEvent?.url);
  const { sessionData: guestEventSession, isLoading: isSessionLoading } = useGuestEventSession(data?.dataEvent?.id);
  const { messages: allPersonalGuestMessages, isLoading: isLoading } = useAllPersonalGuestMessages(data?.dataEvent?.id);

  const mergedData = {
    ...data,
    dataGuest: guestData,
    dataGuestEventSession: guestEventSession,
    allPersonalGuestMessages: allPersonalGuestMessages
  };
  // Preload gambar
  const { progress, isDone } = useImagePreloader(CRITICAL_IMAGES);

  const [ready, setReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (isDone) {
      const t = setTimeout(() => setReady(true), 1000);
      return () => clearTimeout(t);
    }
  }, [isDone]);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setShowOverlay(false), 400);
      return () => clearTimeout(t);
    }
  }, [ready]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);


  return (
    <>
      {showOverlay && (
        <div
          className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-[100] transition-opacity duration-400 ${ready ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
          <Image
            src="/images/Logo PV.png"
            alt="Provite"
            width={220}
            height={60}
            className="mb-0 animate-fade-loop"
            priority
          />
          <div className="w-[280px] h-[2px] bg-gray-200 relative overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{progress}%</p>
        </div>
      )}

      {/* {ready && activePopup?.type === "invitation" && (
        <>
          <div>
            <InvitationPopup
              onClose={() => {
                setActivePopup(null);
                musicPlayerRef.current?.playMusic();
              }}
              name={guestData?.name}
            />
          </div>
        </>
      )} */}

      <MusicPlayer ref={musicPlayerRef} />

      {ready && activePopup?.type === "status" && (
        <StatusPopup
          type={activePopup.data.type}
          title={activePopup.data.title}
          messageId={activePopup.data.messageId}
          messageEn={activePopup.data.messageEn}
          buttons={activePopup.data.buttons}
        />
      )}

      <div className={`${isBlurred ? "blur-background" : ""} min-h-screen relative`}>
        <div className="fixed inset-0 z-0">
          {/* <Image
            src="/images/bg_bg.jpg"
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          /> */}
        </div>

        <Menu />

        <div className="relative">
          <main className="w-full mx-auto bg-[#37576F]">
            <SectionMotif  className="w-full ">
              <Hero data={mergedData} />
              <Bible data={mergedData} />
              <Profile data={mergedData} />
              <Gallery1 data={mergedData} />
              <Rsvp data={mergedData} />
              <Countdown data={mergedData} />
              <Gift data={mergedData} />
            </SectionMotif>

          </main>
        </div>

       


      </div>
    </>
  );
}