import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./Cursor/LiveCursors";
import React, { useCallback, useEffect, useState } from "react";
import CursorChat from "./Cursor/CursorChat";
import { CursorMode,CursorChatProps } from "@/types/type";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,
  });

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    // setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  useEffect(() => {
    const onKeyUp = (e:React.KeyboardEvent) => {
      if(e.key === '/'){
        setCursorState({
          mode:CursorMode.Chat,
          previousMessage:null,
          message: "",
        }) 
      } else if (e.key === 'Escape') {
          updateMyPresence({message: ''})
          setCursorState({mode:CursorMode.Hidden})
      }   
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
      e.key === '/' ? e.preventDefault() : ''
    }

    window.addEventListener('keyup',onKeyUp)
    window.addEventListener('keydown',onKeyDown)

    return () => {
      window.removeEventListener('keyup',onKeyUp)
      window.removeEventListener('keydown',onKeyDown)
    }
  }, [updateMyPresence])
  

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100vh] w-full flex items-center justify-center"
    >
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <h1 className="text-2xl text-center text-white">
        Welcome to Quick Design
      </h1>
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
