"use client";

import Image from "next/image";
import { memo } from "react";
import ActiveUsers from "./Users/ActiveUsers";
import { NavbarProps } from "@/types/type";
// { activeElement, imageInputRef, handleImageUpload, handleActiveElement }: NavbarProps

const Navbar = () => {
  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white py-3">
        <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />
        <ActiveUsers />
    </nav>
  )
}

export default Navbar