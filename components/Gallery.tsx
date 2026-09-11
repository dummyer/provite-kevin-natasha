"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "@/app/gallery.css";

type GalleryImage =
  | string
  | {
      src: string;
      position?: string; // contoh: "center top", "20% 50%", "right bottom"
    };

type GalleryProps = {
  data: any;
};

export default function Gallery({ data }: GalleryProps) {
  const images: GalleryImage[] = data?.gallery || [
    "/gallery/Asset-03.jpg",
    { src: "/gallery/Asset-05.jpg", position: "center 10%" },
    { src: "/gallery/Asset-06.jpg", position: "top" },
    { src: "/gallery/Asset-07.jpg", position: "bottom 4%" },
    { src: "/gallery/Asset-08.jpg", position: "center 65%" },
    "/gallery/Asset-09.jpg",
    { src: "/gallery/Asset-10.jpg", position: "bottom" },
    { src: "/gallery/Asset-11.jpg", position: "center 13%" },
    { src: "/gallery/Asset-12.jpg", position: "center 30%" },
  ];

  return (
    <section className="gallery" id="gallery">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        className="gallery__swiper"
      >
        {images.map((image, index) => {
          const src = typeof image === "string" ? image : image.src;
          const position = typeof image === "string" ? undefined : image.position;

          return (
            <SwiperSlide key={index}>
              <div className="gallery__image">
                <Image
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  width={1200}
                  height={1600}
                  priority={index === 0}
                  sizes="100vw"
                  className="gallery__image-img"
                  style={
                    position
                      ? ({ "--img-position": position } as React.CSSProperties)
                      : undefined
                  }
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}