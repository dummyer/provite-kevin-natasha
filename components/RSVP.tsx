"use client";
import Image from "next/image";
import { SmartRsvpForm, useSmartRsvp } from "@/app/rsvp/SmartRsvpFormBased";
import moment from "moment";
import '@/app/rsvp.css';
import FadeIn from "@/app/sections/FadeIn";
import BouncyZoom from "@/app/sections/BouncyZoom";

moment.locale("en");

interface RSVPProps {
    data: any;
    paramUrl?: string;
    onSubmitRSVP?: (result: { attending: boolean }) => void;
}

export default function Rsvp({ data, paramUrl = "", onSubmitRSVP }: RSVPProps) {
    return (
        <SmartRsvpForm data={data} paramUrl={paramUrl} onSubmitRSVP={onSubmitRSVP}>
            <RSVPSectionDesign data={data} />
        </SmartRsvpForm>
    );
}

function RSVPSectionDesign({ data }: { data: any }) {
    const { guestData, paramUrl, attendStatus, confirmed } = useSmartRsvp();
    const selected = attendStatus === 1 ? "hadir" : attendStatus === 2 ? "tidak" : null;

    return (
        <div id="rsvp" className="w-full">
            <SmartRsvpForm.Modals />

            <div
                className="rsvp w-full relative bg-white 
                p-[35px_35px_55px] 
                lg:p-[60px_100px] 
                "
                id="rsvp"
            >
                {/* Layer 1: base color */}
                <div className="absolute inset-0 bg-[#251001] pointer-events-none" />

                {/* Layer 2: texture, multiply ke base color */}
                <div
                    className="absolute inset-0 mix-blend-multiply pointer-events-none"
                    style={{
                        backgroundImage: `url('/images/rsvp_bg.png')`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                    }}
                />

                {/* Layer 3: overlay warna tambahan (opacity 0, tinggal naikin kalau perlu) */}
                <div className="absolute inset-0 bg-[#251001] mix-blend-multiply opacity-0 pointer-events-none" />

                <div className="items-center flex flex-col w-full relative z-10">
                    <FadeIn>
                        <div className="mb-[85px] lg:mb-[60px]">
                            <p className="rsvp_title">RSVP</p>
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <h1 className="dear mb-[10px] lg:mb-[15px]">
                            MR. / MRS. / MS.
                        </h1>
                    </FadeIn>

                    <FadeIn>
                        <div className="h-[14px] lg:h-[45px] mb-10 mb-15">
                            <h1 className="rsvp_guest">
                                {paramUrl !== "" ? paramUrl : guestData?.name ?? "............."}
                            </h1>
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <div className="mb-5 lg:mb-8 rsvp_content w-[200px] lg:w-[382px]">
                            <h1 className="">
                                Due to seating arrangements, we kindly request
                                <span> your confirmation of attendance.</span>
                            </h1>
                            <span> by </span>
                            <span className="rsvp_time">
                                {moment(
                                    data?.dataEvent?.closeRSVPDate
                                        ? new Date(data.dataEvent.closeRSVPDate).toISOString()
                                        : new Date().toISOString()
                                ).format("DD MMMM YYYY")}
                            </span>
                        </div>
                    </FadeIn>


                    <div
                        className="flex gap-[22px] lg:gap-[28.69px] mb-[60px] lg:mb-[85px]"
                        style={{ justifyContent: "center" }}
                    >
                        <BouncyZoom>
                            <SmartRsvpForm.AttendToggle
                                className={`h-[42px] w-[113px] z-10 
                                        lg:w-[165px] lg:h-[60px] 
                                        pt-1
                                        px-[6px] rounded-[71px] border flex items-center justify-center 
                                        leading-none rsvp_button cursor-pointer hover
                                    ${selected === "hadir"
                                        ? "bg-[#FFFFFF] text-[#1F0D01] border-transparent"
                                        : "bg-transparent text-[#FFFFFF] border-[#FFFFFF]"}`}
                            />
                        </BouncyZoom>
                        <BouncyZoom>
                            <SmartRsvpForm.NotAttendToggle
                                className={`h-[42px] w-[113px] z-10 
                                pt-1
                                        lg:w-[165px] lg:h-[60px] 
                                        px-[6px] rounded-[71px] border flex items-center justify-center leading-none rsvp_button cursor-pointer hover
                                    ${selected === "tidak"
                                        ? "bg-[#FFFFFF] text-[#1F0D01] border-transparent"
                                        : "bg-transparent text-[#FFFFFF] border-[#FFFFFF]"}`}
                            />
                        </BouncyZoom>
                    </div>
                    <FadeIn>

                        {selected !== null && <p className="rsvp_confirm_label mb-[25px] lg:mb-[35px]">Confirm Your RSVP</p>}
                    </FadeIn>
                    <SmartRsvpForm.Accordion className="w-full mb-[36px]" bgActiveColor="#5F2D1C" />

                    <SmartRsvpForm.SubmitButton
                        className={`
                            h-[42px] w-[200px] 
                            lg:h-[60px] lg:w-[292px]
                            px-[6px] rounded-[71px] 
                            border 
                            flex items-center justify-center 
                            rsvp_button cursor-pointer hover
                            mb-[50px] lg:mb-[80px]
                            ${confirmed
                                ? "bg-[#FFFFFF] text-[#1F0D01] border-transparent"
                                : "bg-transparent text-[#FFFFFF] border-[#FFFFFF]"}`}
                    />
                </div>
            </div>
        </div>
    );
}