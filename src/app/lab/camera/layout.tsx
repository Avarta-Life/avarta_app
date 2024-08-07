"use client";

import { ImageProvider } from "@/context/ImageContext";
import * as React from "react";

export interface ICameraLayoutProps {
  children: React.ReactNode;
}

export default function CameraLayout(props: ICameraLayoutProps) {
  const [image, setImage] = React.useState<string | null>(null);

  const updateImage = React.useCallback(
    (image: string | null) => {
      setImage(image);
    },
    [setImage]
  );

  return <ImageProvider>{props.children}</ImageProvider>;
}
