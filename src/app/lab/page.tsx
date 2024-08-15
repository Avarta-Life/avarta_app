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
    </>
  );
}
