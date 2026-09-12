"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "@/app/gallery.css";

type GalleryProps = {
  data: any;
};

export default function Gallery({ data }: GalleryProps) {
  const images: string[] = data?.gallery || [
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
      <div className="gallery__wrapper">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides={false}
          breakpoints={{
            768: {
              slidesPerView: "auto",
              centeredSlides: true,
              spaceBetween: 16,
            },
          }}
          navigation={{
            prevEl: ".gallery__nav--prev",
            nextEl: ".gallery__nav--next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          speed={700}
          className="gallery__swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="gallery__slide">
              <div className="gallery__image">
                <Image
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 90vw, 60vw"
                  className="gallery__image-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}