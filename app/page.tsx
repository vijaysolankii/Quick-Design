"use client"
import Image from "next/image";
import { Room } from "./Room";
import Live from "@/components/Live";
import Navbar from "@/components/Navbar";


export default function Home() {
  return <div>
    <Navbar />
    <Live />
  </div>;
}
