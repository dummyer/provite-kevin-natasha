import { formatEventDateParts } from "@/app/lib/date"; // sesuaikan path-nya

type CoupleNamesProps = {
    fullText: string; // contoh: "Kevin & Natasha"
    separator?: string; // default "&" atau "and"
    date?: string;
};

export default function CoupleNames({ fullText, separator = "&", date }: CoupleNamesProps) {
    // buang prefix "The Wedding of " (case-insensitive), ambil bagian nama aja
    const cleanText = fullText.replace(/^.*?wedding of\s*/i, "").trim();

    const parts = cleanText.split(separator).map((s) => s.trim());
    const [name1, name2] = parts;
    const { weekday, day, month, year } = formatEventDateParts(date);

    return (
        <div className="couple-names w-full text-left">
            <div className="w-fit mx-auto">
                <span className="name-primary">{name1}</span>

                <div className="flex">
                    <div className="date-block flex flex-col my-auto w-[55px] 
                                    shrink-0 w-[73px] mr-[19px] lg:w-[147px] lg:mr-[14px]">
                        <span>{weekday},</span>
                        <span className="whitespace-nowrap">{day}</span>
                        <span>{year}</span>
                    </div>

                    <div className="flex gap-[6px] lg:gap-[14px] mt-[-10px] lg:mt-[-20px]">
                        <div className="connector lg:mr-[14px] mt-[15px] lg:mt-[20px]">and</div>
                        <div className="name-secondary ml-[10px] lg:ml-[7px] pt-[5px]">{name2}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}