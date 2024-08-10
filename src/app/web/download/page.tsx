import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import './page.css'; 

export interface IDownloadProps {}

export default function Download(props: IDownloadProps) {
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-[70vh]">
      <div className="animation-container w-full md:w-1/2 relative bg-white max-h-[7000px] min-h-[500px] h-full">
        <div className="absolute w-full h-full">
          <video autoPlay muted loop className="video-full">
            <source src="/assets/video/trynow.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute z-10 w-full h-full bg-green-800 bg-opacity-30 flex flex-col">
          <div className="flex flex-1 w-full justify-center items-center">
            <div className="w-full text-center">
              {/* Additional content can go here if needed */}
            </div>
          </div>
        </div>
      </div>
      <div className="text-container w-full md:w-1/2 p-4">
      <h1 className={cn("text-5xl lg:text-6xl text-green-500 font-semibold leading-tight p-2")} >
  Start <br />Recycling <br /> Today
</h1>
        <div className="flex justify-center pt-10 gap-4">
          <Link href="/download">
            <Image
              src="/assets/common/google-play.png"
              alt="Google Play Store"
              width={200}
              height={70}
            />
          </Link>
          <Link href="/download">
            <Image
              src="/assets/common/app-store.png"
              alt="App Store"
              width={200}
              height={70}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}