"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
    pin: string;
  }>;
};

export default function PinPage({ params }: Props) {
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { id, pin } = await params;

      localStorage.setItem("pin", pin);

      router.replace(`/${id}`);
    }

    init();
  }, [params, router]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[100]">
      <Image
        src="/images/Logo PV.png"
        alt="Provite"
        width={220}
        height={60}
        className="mb-0 animate-fade-loop"
        priority
      />
      <div className="w-[280px] h-[2px] bg-gray-200 relative overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: "0%" }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">0%</p>
    </div>
  );
}