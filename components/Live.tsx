import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./Cursor/LiveCursors";
import React, { useCallback, useEffect, useState } from "react";
import CursorChat from "./Cursor/CursorChat";
import { CursorMode,CursorChatProps, Reaction, CursorState, ReactionEvent } from "@/types/type";
import ReactionSelector from "./Reaction/ReactionButton";
import FlyingReaction from "./Reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";

type Props = {
  canvasRef : React.MutableRefObject<HTMLCanvasElement | null>;
}

const Live = ({canvasRef} : Props) => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const broadcast = useBroadcastEvent();

  const [reaction, setReaction] = useState<Reaction[]>([])

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    if(cursor == null || cursorState.mode !== CursorMode.ReactionSelector){
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
  
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    // setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });

    setCursorState((state:CursorState) =>  cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state);
  }, [cursorState.mode,setCursorState]);

  const handlePointerUp = useCallback(() => {
    setCursorState((state:CursorState) =>  cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state);
  },[cursorState.mode,setCursorState])

  const setReactions = useCallback((reaction:string) => {
    setCursorState({mode:CursorMode.Reaction,reaction,isPressed:true})
  },[])

  useInterval(()=> {
    if(cursorState.mode === CursorMode.Reaction && cursor && cursorState.isPressed){
      setReaction(reaction => reaction.concat([
        {
          point: {x: cursor.x,y:cursor.y},
          value: cursorState.reaction,
          timestamp: Date.now()
        }
      ]))
      broadcast({
        x : cursor.x,
        y : cursor.y,
        value : cursorState.reaction,
      })
    }
  },100)


  useInterval(() => {
    setReaction((reaction)=> reaction.filter((r) => r.timestamp > Date.now() - 4000))
  } ,1000)

  useEventListener((eventData)=>{
    const event = eventData.event as ReactionEvent

    setReaction((reaction)=> reaction.concat([
      {
        point : {x: event.x,y:event.y},
        value: event.value,
        timestamp : Date.now()
      }
    ]))
  })

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
      } else if (e.key === 'e'){
        setCursorState({mode:CursorMode.ReactionSelector})
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
      onPointerUp={handlePointerUp}
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


      <canvas id="canvas" ref={canvasRef} />
      
      {
        cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector 
            setReaction={setReactions}
          />
        )
      }
      {
        reaction.map(r => (
          <FlyingReaction 
            key={r.timestamp.toString()}
            x= {r.point.x}
            y= {r.point.y}
            timestamp={r.timestamp}
            value={r.value}
          />
        ))
      }
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
