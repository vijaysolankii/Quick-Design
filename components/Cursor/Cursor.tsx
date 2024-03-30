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

      {/* MESSAGE */}
    </div>
  );
};

export default Cursor;
