"use client";

import { forwardRef, useState } from "react";

type Gallery1Props = {
    data: any;
};

const Gallery1 = forwardRef<HTMLElement, Gallery1Props>(({ data }, ref) => {
    return (
        <div className="w-full h-[100vh] relative bg-white" id="gallery">
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('/images/gallery.png')` }}
            />
        </div>
    );
});

Gallery1.displayName = "Gallery1";

export default Gallery1;