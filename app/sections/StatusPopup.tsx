"use client";

import React from "react";
import PopupWrapper from "./PopupWrapper";
import Image from "next/image";

export type StatusPopupType = "success" | "warning" | "question";

export type StatusPopupButton = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
};

type StatusPopupProps = {
  type: StatusPopupType;
  title: string;
  messageId: string; // pesan Bahasa Indonesia
  messageEn: string; // pesan English
  buttons: StatusPopupButton[]; // 1 atau 2 button
};

function StatusIcon({ type }: { type: StatusPopupType }) {
  const base = "w-12 h-12 rounded-full flex items-center justify-center mx-auto";

  if (type === "success") {
    return (
      <div className={base}>
        {/* <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> */}
        <Image src="ico/ic_confirmed.svg" alt="icon status" width={42} height={42} />
      </div>
    );
  }

  if (type === "question") {
    return (
      <div className={`${base}`}>
        <Image src="ico/ic_question.svg" alt="icon status" width={42} height={42} />
      </div>
    );
  }

  // warning (default)
  return (
    <div className={`${base}`}>
      <Image src="ico/ic_warning.svg" alt="icon status" width={42} height={42} />
    </div>
  );
}

export default function StatusPopup({ type, title, messageId, messageEn, buttons }: StatusPopupProps) {
  return (
    <PopupWrapper overlayColor="#E9E9E9" overlayOpacity={0.66} blurAmount="3px" edgeMargin="0px" contentPadding="24px">
      <div className="lg:max-w-[485px] max-w-[322px] relative z-50 w-full bg-white rounded-[10px] shadow-2xl flex flex-col overflow-hidden">
        <div className="px-[30px] pt-[38px] pb-6 text-center lg:px-[31px] lg:pt-[57px] lg:pb-[31px]">
          <StatusIcon type={type} />
          <h3 className="status_popup_title mt-[15px] mb-[15px] lg:mt-[23.04px] lg:mb-[27px]">{title}</h3>

          <div className="status_popup_content min-h-[149px] lg:min-h-[224px]">
            <p className="">{messageId}
              <br></br>
              <br></br>
              {messageEn}
            </p>
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] flex">
          {buttons.map((btn, i) => {
            const anyLoading = buttons.some((b) => b.loading);
            const isDisabled = btn.disabled || anyLoading;
            return (
              <button
                key={btn.label}
                onClick={btn.onClick}
                disabled={isDisabled}
                style={btn.label === 'Close' ? undefined : { fontWeight: 700 }}
                className={`status_popup_button flex-1 pt-[15px] pb-[22px] lg:pt-[22.63px] lg:pb-[33.18px] text-sm flex items-center justify-center gap-2 hover_popup_button
                  } ${i > 0 ? "border-l border-[#e5e5e5]" : ""} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {btn.loading && (
                  <span
                    className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                    
                  />
                )}
                {btn.loading ? "Mengirim..." : btn.label}
              </button>
            );
          })}
        </div>
      </div>
    </PopupWrapper>
  );
}