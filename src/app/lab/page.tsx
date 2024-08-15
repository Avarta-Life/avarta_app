"use client";

import LabBackground from "@/components/background/LabBackground";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageProvider } from "@/context/ImageContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CameraIcon, ChevronsDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface ILabProps {}

export default function Lab(props: ILabProps) {
  const [location, updateLocation] = useLocalStorage("location", "");
  const [hasAccess, setHasAccess] = useState(true);
  const [showLocationError, setShowLocationError] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(`${latitude},${longitude}`);
          setHasAccess(true);
        },
        () => setHasAccess(false),
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setHasAccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasAccess) {
      setShowLocationError(true);
    }
  }, [hasAccess]);

  return (
    <>
      <LabBackground topLeftLeaf topRightLeaf />
      <div className="flex flex-col h-screen">
        <div className="flex-grow flex flex-col justify-end items-center">
          <Image
            className="h-20 mt-10"
            src="/assets/lab/avarta-life.svg"
            alt="logo"
            width={96 * 2}
            height={32 * 2}
          />
        </div>
        <div className="p-10 flex flex-col justify-center items-center">
          <Image
            className="h-40 mt-7"
            src="/assets/lab/recycle-bin-with-leaf.svg"
            alt="recycle bin with leaf"
            width={300}
            height={400}
          />
          <div className="w-40 mt-10 font-light">
            Scan things to let me help you recycle it or make better use of it.
          </div>
          <ChevronsDownIcon className="my-5 w-10 h-10 animate-bounce" />
          <Button variant="default" className="w-full p-2 py-8" asChild>
            <Link href="/lab/camera">
              <CameraIcon className="w-8 h-8" />
            </Link>
          </Button>
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
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
