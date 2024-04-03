import { CursorChatProps, CursorMode } from "@/types/type";
import Cursor from "./Cursor";
import CursorSVG from "@/public/assets/CursorSVG";
import React from "react";

const CursorChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: "",
      });
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  };

  return (
    <div
      className="absolute top-0 left-0"
      style={{ transform: `translate(${cursor.x}px,${cursor.y}px)` }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div className="absolute top-5 left-2 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]" onKeyUp={(e) => e.stopPropagation()}>
            {cursorState?.previousMessage && (
              <div>{cursorState?.previousMessage}</div>
            )}
            <input
              type="text"
              name="commet"
              id="commet"
              className="z-10 w-60 border-none outline-none placeholder-blue-300 bg-transparent text-white"
              autoFocus={true}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={cursorState.message}
              placeholder={cursorState.previousMessage ? "" : "Type a message"}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;
