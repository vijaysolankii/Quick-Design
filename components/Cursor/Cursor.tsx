import CursorSVG from "@/public/assets/CursorSVG";
import React from "react";

type Props = {
  x: number;
  y: number;
  color: string;
  message: string;
};

const Cursor = ({ x, y, color, message }: Props) => {
  return (
    <div
      className="pointer-event-none absolute left-0 top-0"
      style={{ transform: `translate(${x}px,${y}px)` }}
    >
      <CursorSVG color={color} />

      {message && (
        <div className="absolute top-5 left-2 px-4 py-2 rounded-3xl" style={{backgroundColor:color}}>
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">{message}</p>
        </div>
      )}

    </div>
  );
};

export default Cursor;
