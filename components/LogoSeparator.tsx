"use client";
import Image
    from "next/image";

type dataProps = {
    desktop?: Boolean;
}
export default function LogoSeparator({ desktop = true }: dataProps) {
    return <>
        <div className={`h-12 lg:h-20 bg-[#060606] flex  w-full items-center ${!desktop && 'lg:hidden'}`}>
            <Image src="/images/logo_hero.png" alt="Logo" width={27} height={26}
                className="lg:w-[69px] lg:h-[66px] m-auto"
            />
        </div>
    </>
}