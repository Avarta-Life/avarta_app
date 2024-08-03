import * as React from "react";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <div className="border-t w-full">
      <div className="max-w-7xl mx-auto">
        <div className="w-full flex justify-between  py-4">
          <div>&copy; 2024 Avarta. All Rights Reserved.</div>
          <div>Made with ❤️ by Avarta</div>
        </div>
      </div>
    </div>
  );
}
