"use server";

import axios from "axios";
import { base64ToBlob } from "@/lib/utils";

export async function uploadImage(base64Image: string) {
  const base64Data = base64Image.split(",")[1];
  const contentType = base64Image.split(",")[0].split(":")[1].split(";")[0];
  const blob = base64ToBlob(base64Data, contentType);

  const formData = new FormData();
  formData.append("file", blob, "image.jpg"); // You can change the file name

  try {
    const response = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
