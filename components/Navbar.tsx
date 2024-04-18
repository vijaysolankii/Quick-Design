"use client";

import Image from "next/image";
import { memo } from "react";
import ActiveUsers from "./Users/ActiveUsers";
import { ActiveElement, NavbarProps } from "@/types/type";
import { navElements } from "@/constants";
// { activeElement, imageInputRef, handleImageUpload, handleActiveElement }: NavbarProps

const Navbar = () => {
  return (

    // Need to animate logo on hover
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white py-3">
        <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />
        <ul className="flex flex-row">
          {
            navElements.map((item : ActiveElement | any) => (
              <li>
                {
                  Array.isArray(item.name) ? (
                    <ShapeMenu />

                    // resized all elements on drag
                  ) : item?.value === 'comments' ? (
                    <NewThread></NewThread>
                  ) : (
                    <button></button>
                  )
                }
              </li>
            ))
          }
          
        </ul>
        <ActiveUsers />
    </nav>
  )
}

export default Navbar