import { ReactNode } from "react";
import Image from "next/image";

type PanelMotifProps = {
    children: ReactNode;
    id?: string;
    className?: string;
    bgColor?: string;
};

export default function PanelMotif({
    children,
    id,
    className = "",
    bgColor = "#715E46",
}: PanelMotifProps) {
    return (
        <section id={id} className={`relative ${className}`}
            style={{
                backgroundColor: bgColor,
                boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.6)",
            }}
        >
            <div
                className="relative w-full mx-auto isolate"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: "url(/images/bg_motif.jpg)",
                        backgroundSize: "auto",
                        backgroundPosition: "center",
                        backgroundRepeat: "repeat",
                        mixBlendMode: "multiply",
                    }}
                />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </section>
    );
}