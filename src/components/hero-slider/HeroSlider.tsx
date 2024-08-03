"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "./styles.css";

export interface IHeroSliderProps {}

export default function HeroSlider(props: IHeroSliderProps) {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      effect={"fade"}
      speed={1000}
      style={{
        height: "100%",
        width: "100%",
        minHeight: "200px",
        minWidth: "200px",
      }}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      //   navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-full w-full">
            <Image
              className="h-full w-full object-cover inset-0 scale-animation"
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt={`Slide ${slide.id}`}
              height={1100}
              width={1000}
              src={slide.image}
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const slides = [
  {
    id: 1,
    title: "Slide 1",
    image: "/hero-slider/slider-1.jpg",
  },
  {
    id: 2,
    title: "Slide 3",
    image: "/hero-slider/slider-3.jpg",
  },
  {
    id: 3,
    title: "Slide 4",
    image: "/hero-slider/slider-4.jpg",
  },
  {
    id: 4,
    title: "Slide 5",
    image: "/hero-slider/slider-5.jpg",
  },
];
