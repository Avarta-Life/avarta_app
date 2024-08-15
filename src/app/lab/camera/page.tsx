"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  CheckIcon,
  CircleIcon,
  RefreshCcw,
  XIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Webcam from "react-webcam";
import { ImageContext } from "@/context/ImageContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ICamraPageProps {}

export default function CamraPage(props: ICamraPageProps) {
  const router = useRouter();
  const [image, updateImage] = useLocalStorage("image", "");
  const [location, updateLocation] = useLocalStorage("location", "");
  const [hasAccess, setHasAccess] = useState(true);
  const [showLocationError, setShowLocationError] = useState(false);

  const onCameraAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(`${latitude},${longitude}`);
          setHasAccess(true);
        },
        () => setHasAccess(false)
        // {
        //   enableHighAccuracy: true,
        // }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setHasAccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

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

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    // console.log(imageSrc);
    if (imageSrc) {
      setImageSrc(imageSrc);
      updateImage(imageSrc);
      setImageCaptured(true);
    }
  };

  const reset = () => {
    setImageSrc(null);
    setImageCaptured(false);
  };

  const switchCamera = () => {
    setVideoConstraints({
      ...videoConstraints,
      facingMode:
        videoConstraints.facingMode === "user" ? "environment" : "user",
    });
  };

  const acceptImage = async () => {
    if (image) {
      router.push("/lab/chat");
    }
  };

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
            onUserMedia={() => onCameraAccess()}
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
        <div className="p-0 flex flex-col justify-center">
          <Button
            variant="ghost"
            className="py-10 px-0 rounded-full"
            disabled={!isCaptureEnable && !isImageCaptured}
            onClick={capture}
          >
            {/* <CircleIcon className="w-6 h-6" /> */}
            <CircleIcon className="w-20 h-20 font-light text-primary" />
          </Button>
        </div>
        <div className="p-2 flex flex-col justify-center">
          {isImageCaptured ? (
            <Button
              onClick={acceptImage}
              variant="ghost"
              className="py-7 rounded-full"
            >
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
      <Dialog
        open={showLocationError}
        onOpenChange={() => setShowLocationError(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Location permission not provided.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <h2>
              We cannot provide you nearby NGO and Dumping Locations because you
              have denied permission.
            </h2>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const base64ToBlob = (base64: string, contentType: string = ""): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
