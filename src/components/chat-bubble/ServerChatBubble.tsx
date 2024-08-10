import * as React from "react";
import TypeIt from "typeit-react";

export interface IServerChatBubbleProps {
  thinking?: boolean;
  children?: React.ReactNode;
}

export default function ServerChatBubble(props: IServerChatBubbleProps) {
  return (
    <div className="w-full py-2 flex justify-start">
      <div className="text-white bg-primary max-w-[70%] p-2 px-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-sm">
        {props.thinking || !props.children ? (
          <div className="flex items-center">
            💭 Thinking
            <div className="flex items-center space-x-1 pt-1 pl-2 animate-pulse">
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
            </div>
          </div>
        ) : (
          <TypeIt options={{ cursor: false, lifeLike: true, speed: 100 }}>
            {props.children}
          </TypeIt>
        )}
      </div>
    </div>
  );
}
