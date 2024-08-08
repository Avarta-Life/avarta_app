import * as React from "react";

export interface IUserChatBubbleProps {
  typing?: boolean;
  children?: React.ReactNode;
}

export default function UserChatBubble(props: IUserChatBubbleProps) {
  return (
    <div className="w-full p-2 flex justify-end">
      <div className="text-gray-800 bg-gray-300 font-medium p-2 px-4 rounded-s-2xl rounded-tr-2xl rounded-br-sm ">
        {props.typing || !props.children ? (
          <div className="flex items-center">
            ⌨️ Typing...
            <div className="flex items-center space-x-1 pt-1 pl-2 animate-pulse">
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
            </div>
          </div>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
}
