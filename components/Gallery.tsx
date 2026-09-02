"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "@/app/gallery.css";

type GalleryProps = {
  data: any;
};

export default function Gallery({ data }: GalleryProps) {
  const images = data?.gallery || [
    "/gallery/Asset-03.jpg",
    "/gallery/Asset-05.jpg",
    "/gallery/Asset-06.jpg",
    "/gallery/Asset-07.jpg",
    "/gallery/Asset-08.jpg",
    "/gallery/Asset-09.jpg",
    "/gallery/Asset-10.jpg",
    "/gallery/Asset-11.jpg",
    "/gallery/Asset-12.jpg",
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
        {images.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <div className="gallery__image">
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                width={1200}
                height={1600}
                priority={index === 0}
                sizes="100vw"
                className="gallery__image-img"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}