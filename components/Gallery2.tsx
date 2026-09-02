"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";


type Gallery2Props = {
    data: any;
};

const Gallery2 = forwardRef<HTMLElement, Gallery2Props>(({ data }, ref) => {
    return (
        <div className="w-full h-[504px] lg:h-auto relative lg:pt-[100px] lg:pb-5 overflow-hidden" id="">
    <div className="absolute lg:relative lg:w-[594px] lg:h-[300px] w-full h-full mx-auto inset-0 lg:inset-auto">
        <img
            src="/images/gallery2.png"
            alt="Gallery"
            className="w-full h-full object-cover scale-[1.1] lg:scale-100"
            style={{ objectPosition: "center 100%" }}
        />
    </div>
</div>
    );
});

Gallery2.displayName = "Gallery2";

export default Gallery2;