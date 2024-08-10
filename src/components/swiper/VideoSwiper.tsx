/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

export interface Video {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export interface IVideoSwiperProps {
  height: number;
  videos: Video[];
}

export default function VideoSwiper(props: IVideoSwiperProps) {
  console.log("props.videos", props.videos);
  return (
    <Swiper
      watchSlidesProgress={true}
      slidesPerView={2}
      spaceBetween={20}
      className="mr-10"
    >
      {props.videos.map((video) => (
        <SwiperSlide className="w-40" key={video.url}>
          <Link
            href={video.url}
            prefetch={false}
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className="relative h-full w-full rounded-md overflow-hidden border">
              <img
                className="h-full w-full object-cover inset-0 scale-animation "
                src={video.thumbnail}
                alt={video.title}
              />
              <p className=" bg-gray-100 text-sm h-[6rem] p-2 py-4 leading-6 text-ellipsis overflow-hidden">
                {video.title.length > 50
                  ? `${video.title.slice(0, 50)}...`
                  : video.title}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
