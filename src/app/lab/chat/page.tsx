/* eslint-disable @next/next/no-img-element */
"use client";

import LabBackground from "@/components/background/LabBackground";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import Image from "next/image";
import { RotateCcw, RotateCcwIcon, SendIcon, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

import "./style.css";
import ServerChatBubble from "@/components/chat-bubble/ServerChatBubble";
import UserChatBubble from "@/components/chat-bubble/UserCharBubble";

import axios, { Axios } from "axios";
import { cn } from "@/lib/utils";
import TypeIt from "typeit-react";
import ItemDescription from "./ItemDescription";
import { fetchNearbyPlaces } from "@/lib/places";
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

  const [messages, setMessages] = React.useState<
    { sender: string; message: string }[]
  >([]);

  const [itemsInImage, setItemsInImage] = React.useState<{
    [key: string]: any;
  }>({});
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [videos, setVideos] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log("itemsInImage", itemsInImage);
    console.log("selectedItem", selectedItem);
  }, [itemsInImage, selectedItem]);

  React.useEffect(() => {
    let token = null;
    (async () => {
      try {
        setIsLoading(true);
        const res = await ax.post("/token", {});
        console.log(res.data);
        token = res.data.access_token;
        setSessionToken(token);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }

      try {
        setIsLoading(true);
        const resp = await handleUpload(image, token, ax);

        let genaiData = resp.genai;

        try {
          // if genaiData is a string, parse it
          if (typeof genaiData === "string") {
            genaiData = JSON.parse(genaiData);

            if (Array.isArray(genaiData)) {
              const uniqueObject =
                removeDuplicatesAndConvertToObject(genaiData);
              setItemsInImage(uniqueObject);
            }
          }
          console.log("genaiData.vedio", resp.vedio);
          if (Object.keys(resp).includes("vedio")) {
            setVideos(resp.vedio);
          }
        } catch (error) {
          console.error(error);
        }

        console.log(resp);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

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
  }, [image, message, messages, isLoading, isTyping]);

  const sendMessage = () => {
    if (message) {
      const newMessage = {
        sender: "user",
        message,
      };

      setMessages([...messages, newMessage]);
      setMessage("");

      (async () => {
        try {
          setIsLoading(true);
          const res = await sendMessageReceiveResponse(
            message,
            ax,
            sessionToken
          );
          setMessages([
            ...messages,
            newMessage,
            { sender: "server", message: res },
          ]);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      })();
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
          className="flex-grow flex-basis-0 p-4 overflow-auto flex flex-col"
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
            <ItemDescription
              itemsInImage={itemsInImage}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              axiosClient={ax}
              videos={videos}
            />

            {messages.map((message, index) =>
              message.sender === "server" ? (
                <ServerChatBubble key={index}>
                  {message.message}
                </ServerChatBubble>
              ) : (
                <UserChatBubble key={index}> {message.message} </UserChatBubble>
              )
            )}
            {isLoading && <ServerChatBubble thinking />}
            {isTyping && <UserChatBubble typing />}
          </div>
        </div>
        <div className="flex px-4 py-4 w-full border-t">
          <div className="flex w-full items-center space-x-2 border-none">
            <Input
              disabled={isLoading}
              value={message}
              onChange={(e) => handleTyping(e)}
              type="message"
              placeholder="Ask me something"
            />
            <Button onClick={sendMessage} disabled={isLoading} type="submit">
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
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

const removeDuplicatesAndConvertToObject = (arr: any[]) => {
  const uniqueObject: { [key: string]: any } = {};

  for (let i = 0; i < arr.length; i++) {
    const itemName = arr[i].Item;
    if (uniqueObject.hasOwnProperty(itemName)) {
      uniqueObject[itemName] = {
        ...uniqueObject[itemName],
        Category: uniqueObject[itemName].Category.concat(arr[i].Category),
      };
    } else {
      uniqueObject[itemName];
      uniqueObject[itemName] = {
        ...arr[i],
        Category: [arr[i].Category],
      };
    }
  }
  console.log("uniqueObject", uniqueObject);
  return uniqueObject;
};

const sendMessageReceiveResponse = async (
  message: string,
  client: Axios,
  token: string
) => {
  const response = await client.post(
    "/query",
    {
      query: message,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    }
  );

  let genaiData = response.data;

  try {
    if (typeof genaiData === "string") {
      genaiData = JSON.parse(genaiData);

      if (Array.isArray(genaiData)) {
        genaiData = genaiData[0].response;
      }
    }
  } catch (error) {
    console.log("error", error);
    return "Sorry, I didn't understand. Please try again.";
  }

  return genaiData;
};
