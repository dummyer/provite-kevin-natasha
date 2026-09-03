"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";

type VideoProps = {
    data: any;
};

const Video = forwardRef<HTMLElement, VideoProps>(({ data }, ref) => {
    return (
        <div className="video w-full bg-[#060606]" id="gallery">
            <div className="m-auto lg:p-[156px_195px_60px] 
            
            p-[126px_17px_40px]">
                <div className="relative w-full lg:w-[775px] h-[200px] lg:h-[415px] md:h-[415px] m-auto">
                    <video
                        autoPlay
                        muted
                        loop
                        controls
                        playsInline
                        preload="auto"
                        className="
                    absolute
                    inset-0
                    z-0
                    w-full
                    h-full
                    object-cover
                "
                    >
                        <source
                            src="/videos/video_2.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                <div className="desc relative mx-auto mt-[157px] lg:mt-[86px]">
                    Photo & Video by @emerypicture
                </div>
            </div>
        </div>
    );
});

Video.displayName = "Video";

export default Video;