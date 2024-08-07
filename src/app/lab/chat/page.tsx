/* eslint-disable @next/next/no-img-element */
"use client";

import LabBackground from "@/components/background/LabBackground";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import Image from "next/image";
import { RotateCcw, RotateCcwIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

import "./style.css";

export interface IChatPageProps {}

export default function ChatPage(props: IChatPageProps) {
  const [image, updateImage] = useLocalStorage("image", "");

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  const sendMessage = () => {
    if (message) {
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      <LabBackground topRightLeaf />
      <div className="flex flex-col h-screen w-full">
        <div className="p-4  h-14 w-full">
          <div className="flex gap-x-5 items-end">
            <Image
              className=""
              src="/assets/common/avarta.png"
              alt="Logo"
              width={96}
              height={32}
            />
            <Link href="/lab">
              <RotateCcwIcon className="w-7 h-7" />
            </Link>
          </div>
        </div>
        <div className="flex-grow flex-basis-0 p-4 overflow-hidden flex flex-col">
          <div className="w-full flex flex-col overflow-y-auto overflow-x-hidden">
            {/* Image preview */}
            {image ? (
              <div className="py-4">
                <img src={image} className="h-40 rounded-md" alt="screenshot" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center w-full h-40 rounded-md bg-gray-300 my-10">
                  Oops! Looks like your image is not captured yet.
                </div>
                <Button asChild>
                  <Link href="/lab">
                    <RotateCcw className="mr-2" /> Re-Take a new picture
                  </Link>
                </Button>
              </div>
            )}
            {/* Chat history */}
          </div>
        </div>
        <div className="flex px-4 py-4 w-full border-t">
          <div className="flex w-full items-center space-x-2 border-none">
            <Input
              disabled={!image}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="message"
              placeholder="Ask me something"
            />
            <Button disabled={!image} type="submit">
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
