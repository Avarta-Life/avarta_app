"use client";

import React, { createContext } from "react";

export interface IImageContext {
  image: string | null;
  updateImage: (image: string | null) => void;
}

export const ImageContext = createContext<IImageContext>({
  image: null,
  updateImage: () => {},
});

export const ImageProvider = (props: { children: React.ReactNode }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const updateImage = React.useCallback(
    (image: string | null) => {
      console.log("set image: ", image);
      setImage(image);
    },
    [setImage]
  );
  return (
    <ImageContext.Provider value={{ image, updateImage }}>
      {props.children}
    </ImageContext.Provider>
  );
};
