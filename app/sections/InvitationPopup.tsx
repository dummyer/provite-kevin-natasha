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
  const [firstName, secondName] = namesOnly.split("&").map((n: string) => n.trim());

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
            min-w-[300px]
            md:w-[416px] 
           rounded-[20px] shadow-2xl flex flex-col items-center overflow-hidden"
          >
            {/* Background image layer */}
            <Image
              src="/images/bg_popup.webp"
              alt=""
              fill
              priority
              className="object-cover -z-10 opacity-50"
              style={{ objectPosition: "0% 90%" }}
              sizes="(max-width: 768px) 290px, 416px"
            />

            <div className="w-full flex flex-col items-center">
              {/* Logos - sekarang beneran edge-to-edge karena parent div-nya w-full */}
              <div className="relative w-full h-[188px] md:h-[220px] overflow-hidden">
                <Image
                  src="/images/popup_img.webp"
                  alt=""
                  fill
                  priority
                  className="object-cover scale-170 md:scale-130 -translate-x-[10px] object-[40%_43%] md:object-[40%_45%]"
                // sizes="(max-width: 768px) 290px, 416px"
                />
              </div>

              {/* Text content */}
              <div className="text-center z-50 popup my-[15px_22px] px-[20px]">
                <p className="popup_title_content mb-[25px] md:mb-[27px]">
                  Dear,
                  <br></br>
                  <span>{name || "......."}</span>
                </p>
                <p className="popup_title_gold mb-[18px] md:mb-[12px]">
                  We Invite You to The Wedding of
                </p>
                <div className="mx-auto mt-6">
                  <h2 className="popup_title_name text-start leading-[1.1] 
                  -rotate-[9deg] origin-left 
                  -translate-x-[55px]
                   md:-translate-x-[60px]">
                    {firstName}
                  </h2>

                  <div className="flex items-center justify-end gap-1 
                  translate-x-[35px] 
                  md:translate-x-[40px] 
                  md:-translate-y-[35px]
                  -translate-y-[15px]
                  ">
                    <div
                      className="flex items-center justify-center shrink-0
                 w-[21px] h-[21px] rounded-full bg-[#131313]"
                    >
                      <span className="text-white text-[12px] font-serif italic leading-none">&</span>
                    </div>
                    <h2 className="popup_title_name leading-[1.1] -rotate-[9deg] 
                   
                    -translate-y-[14px] 
                    origin-right">
                      {secondName}
                    </h2>
                  </div>
                </div>


                {/* CTA button */}
                <button
                  onClick={onClose}
                  className="hover rounded-[60px] bg-[#131313] 
                  mt-5 mb-[21px]
                  md:mt-0
                  md:py-0
                  py-[11px] w-[170px] md:w-[200px] h-[33px] 
                  lg:h-[40px] popup_title_button transition"
                >
                  <span className="top-[1px] relative">
                    VIEW INVITATION
                  </span>
                </button>
                <p className="popup_title_apology">
                  We sincerely apologize for
                  <br></br>
                  any misspelling of names or titles.
                </p>

              </div>
            </div>
          </div>
        </FadeIn>
      </PopupWrapper>
    </>
  );
}