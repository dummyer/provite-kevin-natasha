"use client";
import Image from "next/image";
import { SmartRsvpForm, useSmartRsvp } from "@/app/rsvp/SmartRsvpFormBased";
import moment from "moment";

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
        <div id="rsvp">
            <SmartRsvpForm.Modals />

            <div className="relative flex flex-col items-center text-center rsvp mt-2 lg:mt-0">
                <div className="lg:h-[76px] h-[57px]">
                    <p className="rsvp_title lg:pt-[10px] pt-[7px]">Rsvp</p>
                </div>

                <h1 className="mt-[41px] mb-[10px] lg:mt-[51px] lg:mb-4">
                    Dear Mr. /Mrs. / Ms.
                </h1>

                <div className="h-[14px] mb-[18px] lg:mb-[26.23px]">
                    <h1 className="h-[14px] rsvp_guest">
                        {paramUrl !== "" ? paramUrl : guestData?.name ?? "............."}
                    </h1>
                </div>

                <div className="h-[40px] lg:h-[60px] mb-[14px] lg:mb-[26px] rsvp_content">
                    <h1
                        className=""
                    >
                        Kindly confirm your attendance before<br />

                    </h1>
                    <p className="rsvp_time">{moment(
                        data?.dataEvent?.closeRSVPDate
                            ? new Date(data.dataEvent.closeRSVPDate).toISOString()
                            : new Date().toISOString()
                    ).format("DD MMMM YYYY")}</p>
                </div>

                <div
                    className="flex gap-[22px] lg:gap-[28.69px] mb-[58px] lg:mb-[105px]"
                    style={{ justifyContent: "center" }}
                >
                    <SmartRsvpForm.AttendToggle
                        className={`h-[42px] w-[113px] z-10 lg:w-[203px] px-[6px] rounded-[71px] border flex items-center justify-center leading-none rsvp_button cursor-pointer hover
        ${selected === "hadir"
                                ? "bg-[#5F2D1C] text-white border-transparent"
                                : "bg-transparent text-[#5F2D1C] border-[#5F2D1C]"}`}
                    />
                    <SmartRsvpForm.NotAttendToggle
                        className={`h-[42px] w-[113px] z-10 lg:w-[203px] px-[6px] rounded-[71px] border flex items-center justify-center leading-none rsvp_button cursor-pointer hover
        ${selected === "tidak"
                                ? "bg-[#5F2D1C] text-white border-transparent"
                                : "bg-transparent text-[#5F2D1C] border-[#5F2D1C]"}`}
                    />
                </div>

                {selected !== null && <p className="rsvp_confirm_label mb-[24px] lg:mb-[39px]">Confirm Your RSVP</p>}
                <SmartRsvpForm.Accordion className="w-full mb-[36px]" bgActiveColor="#5F2D1C" />

                <SmartRsvpForm.SubmitButton
                    className={`h-[42px] px-[6px] rounded-[71px] lg:w-[220px] lg:h-[52px]
        border flex items-center justify-center leading-none rsvp_button cursor-pointer hover w-[220px] 
         h-[30px]
        mb-[64px]
        lg:mb-[71px]

        ${confirmed
                            ? "bg-[#5F2D1C] text-white border-transparent"
                            : "bg-transparent text-[#5F2D1C] border-[#5F2D1C]"}`}
                />
            </div>
        </div>
    );
}