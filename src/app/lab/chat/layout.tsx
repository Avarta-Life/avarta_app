"use client";

import { ImageProvider } from "@/context/ImageContext";
import * as React from "react";

export interface IChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout(props: IChatLayoutProps) {
  return <ImageProvider>{props.children}</ImageProvider>;
}
