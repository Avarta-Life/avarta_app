import Footer from "@/components/footer/Footer";
import NavigationBar from "@/components/navigation-bar/NavigationBar";
import * as React from "react";

export interface IWebLayoutProps {
  children: React.ReactNode;
}

export default function WebLayout(props: IWebLayoutProps) {
  return (
    <main className="w-full h-screen pt-14">
      <NavigationBar />
      {props.children}
      <Footer />
    </main>
  );
}
