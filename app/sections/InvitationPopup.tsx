import React from "react";
import Image from "next/image";
import PopupWrapper from "./PopupWrapper";
import FadeIn from "./FadeIn";

type InvitationPopupProps = {
  onClose: () => void;
  name?: string;
  data?: any;
};

export default function InvitationPopup({ onClose, name, data }: InvitationPopupProps) {
  const bothName = data?.dataEvent?.name ?? [];
  const namesOnly = bothName.replace(/^The Wedding of\s*/i, "");

  return (
    <>
      {/* Overlay + card, sekarang pakai PopupWrapper */}
      <PopupWrapper
        overlayColor="#000"
        overlayOpacity={0.25}
        blurAmount="3px"
        contentPadding="50px"
        edgeMargin="0px"
      >
        <FadeIn>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 15px 10px -8px rgba(0, 0, 0, 0.55)",
            }}
            className="relative z-50 
             w-full max-w-sm
            w-[290px]
            md:w-[416px] 
           rounded-[20px] shadow-2xl flex flex-col items-center overflow-hidden"
          >
            {/* Background image layer */}
            <Image
              src="/images/bg_popup_full.png"
              alt=""
              fill
              priority
              className="object-cover -z-10 opacity-50"
              style={{ objectPosition: "0% 90%" }}
              sizes="(max-width: 768px) 290px, 416px"
            />

            <div className="w-full flex flex-col items-center">
              {/* Logos - sekarang beneran edge-to-edge karena parent div-nya w-full */}
              <div className="relative w-full h-[180px] md:h-[220px]">
                <Image
                  src="/images/gallery2.png"
                  alt=""
                  fill
                  priority
                  className="object-cover object-[80%_51.5%] lg:object-[77%_49%]"
                  sizes="(max-width: 768px) 290px, 416px"
                />
              </div>

              {/* Text content */}
              <div className="text-center z-1 popup my-[29px_31px] md:my-[35px_36px] px-[20px]">
                <p className="popup_title_gold mb-[18px] md:mb-[12px]">The Wedding of</p>
                <div className="mx-auto mb-[6px] md:mb-3">
                  <h2 className="popup_title_name mx-auto text-start">
                    {namesOnly}
                  </h2>
                </div>
                <p className="popup_title_content mb-[15px] md:mb-[27px]">
                  Dear,
                  <br></br>
                  <span>{name || "......."}</span>
                </p>
                <p className="popup_title_apology mb-[16px] md:mb-[23px]">
                  We sincerely apologize
                  <br></br>
                  for any misspelling of names or titles.
                </p>

                {/* CTA button */}
                <button
                  onClick={onClose}
                  className="hover rounded-full bg-[#131313] 
                  py-[11px] md:mt-[20px] w-[154px] md:w-[220px] h-[30px] lg:h-[35px] popup_title_button transition"
                >
                  VIEW INVITATION
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </PopupWrapper>
    </>
  );
}