"use client";

import { useEffect, useState } from "react";

function getNextImageUrl(src: string, width: number, quality = 75) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export function useImagePreloader(imageUrls: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const uniqueUrls = Array.from(new Set(imageUrls));

    if (uniqueUrls.length === 0) {
      setIsDone(true);
      return;
    }

    let cancelled = false;
    setLoadedCount(0);
    setIsDone(false);

    let count = 0;
    // simpan reference biar image object gak di-GC sebelum onload/onerror fire
    const imgRefs: HTMLImageElement[] = [];

    const handleDone = () => {
      if (cancelled) return;
      count += 1;
      setLoadedCount(count);
      if (count === uniqueUrls.length) {
        setIsDone(true);
      }
    };

    uniqueUrls.forEach((src) => {
      const img = new window.Image();
      imgRefs.push(img);
      img.onload = handleDone;
      img.onerror = handleDone;
      img.src = getNextImageUrl(src, 1920); // width harus MATCH sama yg dipakai <Image> di page
    });

    return () => {
      cancelled = true;
      imgRefs.length = 0;
    };
  }, [imageUrls]);

  const progress = imageUrls.length > 0
    ? Math.round((loadedCount / imageUrls.length) * 100)
    : 100;

  return { progress, isDone };
}