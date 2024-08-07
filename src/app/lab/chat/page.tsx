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
import ServerChatBubble from "@/components/chat-bubble/ServerChatBubble";
import UserChatBubble from "@/components/chat-bubble/UserCharBubble";

import axios, { Axios } from "axios";
const ax = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export interface IChatPageProps {}

export default function ChatPage(props: IChatPageProps) {
  const [isHydrated, setIsHydrated] = React.useState(false);
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  const [image, _] = useLocalStorage("image", "");
  const [sessionToken, setSessionToken] = useLocalStorage("session_token", "");
  const [initResData, setInitResData] = React.useState<any>({});

  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  const [itemsInImage, setItemsInImage] = React.useState<any[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await ax.post("/token", {});
        console.log(res.data);
        setSessionToken(res.data.access_token);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  React.useEffect(() => {
    if (sessionToken && image) {
      (async () => {
        try {
          const res = await handleUpload(image, sessionToken, ax);

          let genaiData = res.genai;

          try {
            // if genaiData is a string, parse it
            if (typeof genaiData === "string") {
              genaiData = JSON.parse(genaiData);

              if (Array.isArray(genaiData)) {
                setItemsInImage(genaiData);
              }
            }
          } catch (error) {
            console.error(error);
          }

          console.log(res);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [sessionToken, image]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const chat = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chat.current) {
      chat.current.scrollTop = chat.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [image, message, isLoading, isTyping]);

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
        <div
          ref={chat}
          className="flex-grow flex-basis-0 p-4 overflow-hidden flex flex-col"
        >
          <div className="w-full flex flex-col">
            {/* Image preview */}
            {image && isHydrated ? (
              <div className="py-4">
                <img src={image} className="h-40 rounded-md" alt="screenshot" />
              </div>
            ) : (
              <>
                {isHydrated && (
                  <>
                    <div className="flex items-center justify-center w-full h-40 rounded-md bg-gray-300 my-10">
                      Oops! Looks like your image is not captured yet.
                    </div>
                    <Button asChild>
                      <Link href="/lab">
                        <RotateCcw className="mr-2" /> Re-Take a new picture
                      </Link>
                    </Button>
                  </>
                )}
              </>
            )}
            {/* Chat history */}
            {itemsInImage.map((item: any, index: number) => (
              <p key={index}>{item.Item}</p>
            ))}
            {isLoading && <ServerChatBubble thinking />}
            {isTyping && <UserChatBubble typing />}
          </div>
        </div>
        <div className="flex px-4 py-4 w-full border-t">
          <div className="flex w-full items-center space-x-2 border-none">
            <Input
              disabled={!image}
              value={message}
              onChange={(e) => handleTyping(e)}
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

export const base64ToBlob = (
  base64: string,
  contentType: string = ""
): Blob => {
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

const handleUpload = async (
  base64Image: string,
  token: string,
  axiosClient: Axios
) => {
  const base64Data = base64Image.split(",")[1];
  const contentType = base64Image.split(",")[0].split(":")[1].split(";")[0];
  const blob = base64ToBlob(base64Data, contentType);

  console.log("contentType", contentType);
  const formData = new FormData();
  formData.append("file", blob, "image.png"); // You can change the file name
  console.log("sessionToken", token);
  try {
    const response = await axiosClient.post("/upload", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });
    console.log("File uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
  return null;
};
