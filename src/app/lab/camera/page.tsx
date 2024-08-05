"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CheckIcon,
  CircleIcon,
  FocusIcon,
  FullscreenIcon,
  ImagesIcon,
  RefreshCcw,
  XIcon,
} from "lucide-react";
import React from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";

export interface ICamraPageProps {}

export default function CamraPage(props: ICamraPageProps) {
  const router = useRouter();

  const vc = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };
  const [videoConstraints, setVideoConstraints] = React.useState(vc);

  const [isCaptureEnable, setCaptureEnable] = React.useState<boolean>(true);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [isImageCaptured, setImageCaptured] = React.useState<boolean>(false);
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
      setImageCaptured(true);
    }
    console.log(imageSrc);
  }, [webcamRef]);

  const reset = React.useCallback(() => {
    setImageSrc(null);
    setImageCaptured(false);
  }, []);

  const switchCamera = React.useCallback(() => {
    setVideoConstraints({
      ...videoConstraints,
      facingMode:
        videoConstraints.facingMode === "user" ? "environment" : "user",
    });
  }, [videoConstraints]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex-grow w-full min-h-8 max-h-[70vh] overflow-hidden flex flex-col justify-center ">
        {!isImageCaptured ? (
          <Webcam
            audio={false}
            width={1280}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="Screenshot" />
          )
        )}
      </div>
      <div className="w-full min-h-8 flex flex-nowrap justify-around py-4">
        <div className="p-2 flex flex-col justify-center">
          {isImageCaptured ? (
            <Button
              variant="ghost"
              onClick={reset}
              className="py-7 rounded-full"
            >
              <XIcon className="w-6 h-6" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="py-7 rounded-full"
              onClick={switchCamera}
            >
              {/* <ImagesIcon className="w-6 h-6" /> */}
              <RefreshCcw className="w-6 h-6" />
            </Button>
          )}
        </div>
        <div className="p-2 flex flex-col justify-center">
          <Button
            variant="ghost"
            className="py-9 rounded-full"
            disabled={!isCaptureEnable && !isImageCaptured}
            onClick={capture}
          >
            {/* <CircleIcon className="w-6 h-6" /> */}
            <CircleIcon className="w-10 h-10 font-light" />
          </Button>
        </div>
        <div className="p-2 flex flex-col justify-center">
          {isImageCaptured ? (
            <Button variant="ghost" className="py-7 rounded-full">
              <CheckIcon className="w-6 h-6" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="py-7 rounded-full"
              onClick={router.back}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
