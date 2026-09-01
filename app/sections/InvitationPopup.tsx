import React from "react";
import Image from "next/image";
import PopupWrapper from "./PopupWrapper";

type InvitationPopupProps = {
  onClose: () => void;
  name?: string;
};

export default function InvitationPopup({ onClose, name }: InvitationPopupProps) {
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
        <div
          style={{
            backgroundImage: "url('/images/bg_motif_3.jpg')",
            boxShadow: "0px 15px 10px -8px rgba(0, 0, 0, 0.55)",
          }}
          className="relative z-50 lg:w-[416px] w-full max-w-sm
          min-w-[290px] 
         bg-cover bg-center
         rounded-[15px] shadow-2xl flex flex-col items-center overflow-hidden">

          <div className="w-full flex flex-col items-center">

            {/* Logos - sekarang beneran edge-to-edge karena parent div-nya w-full */}
            <div
              className="w-full h-[180px] lg:h-[211px]
             bg-[length:120%_auto] bg-[80%_51.5%]
             lg:bg-[length:113%_auto] lg:bg-[77%_49%]"
              style={{
                backgroundImage: "url('/images/popup_header_full.jpg')",
              }}
            >

            </div>
            {/* Text content */}
            <div className="text-center px-6 z-1 popup pt-[29px] lg:pt-[35px] lg:pb-[38px] pb-9 ">
              <p className="popup_title_gold h-5 mb-[10px]">The Wedding of</p>
              <div className="w-[143px] lg:w-[218px] mx-auto">
                <h2 className="popup_title_name lg:ml-[20px] mx-auto text-start">
                  Wilson &
                </h2>
                <p className="popup_title_name pl-10 mt-[-10px] lg:pl-18 lg:mt-[-15px]">Steffanny</p>

              </div>
              <p className="popup_title_content h-[46px] lg:h-[55px] mt-2 lg:mt-[25px] mb-[10px] lg:mb-[19px]">
                Dear,
                <br></br>

                <span>{name || "......."}</span>
              </p>
              <p className="popup_title_apology w-[193px] lg:w-[316px]">We sincerely apologize<br></br>
                for any misspelling of names or titles.</p>

              {/* CTA button */}
              <button
                onClick={onClose}
                className="hover h-[30px] w-[154px] lg:w-50 lg:h-[35px] rounded-full bg-[#5F2D1C] mt-[17px] lg:mt-7
                popup_title_button transition"
              >
                VIEW INVITATION
              </button>
            </div>

            {/* Flower MOBILE */}
            <div className="lg:hidden">
              <Image
                src="/images/popup_flower_left_mobile.png"
                alt=""
                width={110}
                height={325}
                priority
                className="absolute left-[0px] bottom-[0] z-0 object-contain"
              />

              <Image
                src="/images/popup_flower_left_mobile.png"
                alt=""
                width={110}
                height={325}
                priority
                className="absolute right-[0px] bottom-[0] z-0 object-contain scale-x-[-1]"
              />
            </div>

            {/* Flower DESKTOP */}
            <div className="lg:block hidden">
              <Image
                src="/images/popup_flower_left.png"
                alt=""
                width={155}
                height={325}
                priority
                className="absolute left-[0px] bottom-[0] z-0 object-contain"
              />

              <Image
                src="/images/popup_flower_left.png"
                alt=""
                width={155}
                height={325}
                priority
                className="absolute right-[0px] bottom-[0] z-0 object-contain scale-x-[-1]"
              />
            </div>

          </div>


        </div>
      </PopupWrapper>
    </>
  );
}