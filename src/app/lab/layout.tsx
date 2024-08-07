import { ImageProvider } from "@/context/ImageContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-sm h-screen mx-auto relative overflow-y-auto">
      {children}
    </div>
  );
}
