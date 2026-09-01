"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex h-screen items-center justify-center">
      Loading...
    </div>
  );
}