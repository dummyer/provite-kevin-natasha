"use client";
import Image
    from "next/image";

type dataProps = {
    desktop?: Boolean;
}
export default function LogoSeparator({ desktop = true }: dataProps) {
    return <>
        <div className={`h-12 lg:h-20 bg-[#060606] flex w-full items-center ${!desktop && 'lg:hidden'}`}>
            <div className="w-[27px] h-[26px] lg:w-[69px] lg:h-[66px] m-auto relative">
                <Image
                    src="/images/logo_putih.webp"
                    alt="Logo"
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                />
            </div>
        </div>
    </>
}