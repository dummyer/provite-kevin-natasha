"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import "@/app/footer.css";
import FadeIn from "@/app/sections/FadeIn";

type FooterProps = {
    data: any;
};

const Footer = forwardRef<HTMLElement, FooterProps>(({ data }, ref) => {
    const coupleNames = data?.dataEvent?.name ?? "Kevin & Natasha";
    const date = data?.dataEvent?.date ?? "2026-10-25";

    return (
        <div className="footer w-full relative " id="footer">
            <div className="items-center flex flex-col w-full relative ">
                <div className="p-[35px_32px] lg:pb-[100px] text-center flex flex-col w-full">
                    <div className="mx-auto mb-[55px] lg:mb-[42px]">
                        <Image src="/images/logo_hero_black.svg" priority alt="Logo" width={30} height={29}
                            className="lg:w-[52px] lg:h-[52px]"
                        />
                    </div>
                    <FadeIn>
                        <div className="mb-[15px] lg:mb-[45px] title">
                            Thank you, truly.
                        </div>
                    </FadeIn>
                    <FadeIn>
                        <div className="desc mb-[66px] lg:w-[468px] lg:mb-[59px] mx-auto">
                            For being a significant part of our life, journey, and story.
                            <span> We look forward to celebrate our day with you.
                                See you very soon, loved and precious ones!</span>
                        </div>
                    </FadeIn>
                    <div className="mx-auto">
                        <Image src="/images/logo_footer.png" priority alt="Logo" width={89} height={34} />
                    </div>
                </div>
            </div>
        </div>
    );
});

Footer.displayName = "Footer";

export default Footer;