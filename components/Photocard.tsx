"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";

type PhotocardProps = {
    data: any;
};

const Photocard = forwardRef<HTMLElement, PhotocardProps>(({ data }, ref) => {
    return (
        <div className="photocard w-full md:h-[557px] bg-white" id="gallery">
            <div className="md:w-[775px] w-[372px] m-auto p-[15px_9px] md:py-10">
                <div className="relative w-full lg:w-[775px] h-[200px] md:h-[415px] m-auto">
                    <Image
                        src="/images/photocard.png"
                        alt="Photocard"
                        fill
                        priority
                        className="object-cover"
                        style={{
                            objectPosition: "center 100%"
                        }}
                    />
                    <Image
                        src="/images/watermark_logo.png"
                        alt=""
                        priority
                        width={176}
                        height={168}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 
                        md:w-[434px] md:h-[416px]
                        -translate-y-1/2 pointer-events-none select-none"
                    />
                </div>

                <div className="desc md:w-[162px] w-[105px] text-left ml-auto mt-[15px] md:mt-5">
                    Postcards from Tokyo
                    <br />
                    <span>March, 2026.</span>
                </div>
            </div>
        </div>
    );
});

Photocard.displayName = "Photocard";

export default Photocard;