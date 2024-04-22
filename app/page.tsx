"use client";

import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import {
  handleCanvasMouseDown,
  handleResize,
  initializeFabric,
} from "@/lib/canvas";
import { handleKeyDown } from "@/lib/key-events";

const Home = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>('ractangle');


  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });
  
    
    // Canvas init functionality
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas, 
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    });


    window.addEventListener("resize", () => {
      handleResize({ canvas: fabricRef.current, });
    });
    return () => {
      canvas.dispose();

      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
    };
  },[canvasRef])

  

  return (
    <>
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <LeftSidebar />
        {/* Canvas file need to change */}
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
    </>
  );
}


export default Home;