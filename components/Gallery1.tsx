"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";

type Gallery1Props = {
    data: any;
};

const Gallery1 = forwardRef<HTMLElement, Gallery1Props>(({ data }, ref) => {
    return (
        <div className="w-full h-[520px] lg:h-[951px] relative bg-white" id="">
            <Image
                src="/images/gallery.png"
                alt="Gallery"
                priority
                fill
                className="object-cover"
                style={{ objectPosition: "center 65%" }}
                sizes="100vw"
            />
        </div>
    );
});

Gallery1.displayName = "Gallery1";

export default Gallery1;