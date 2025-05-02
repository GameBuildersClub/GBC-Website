'use client'


import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";


import { poppins } from "../fonts/poppins";

// https://github.com/vercel/next.js/discussions/14810#discussioncomment-8606715

export default function Navigation () {
    const useMediaQuery = (width: number) => {
        const [targetReached, setTargetReached] = useState(false);
      
        const updateTarget = useCallback((e: MediaQueryListEvent) => {
          if (e.matches) {
            setTargetReached(true);
          } else {
            setTargetReached(false);
          }
        }, []);
      
        useEffect(() => {
          const media = window.matchMedia(`(max-width: ${width}px)`);
          media.addEventListener("change", updateTarget);
      
          if (media.matches) {
            setTargetReached(true);
          }
      
          return () => media.removeEventListener("change", updateTarget);
        }, []);
      
        return targetReached;
    };

    return(
        <div className="bg-darkGrey flex flex-col">

        <div className="flex flex-row justify-between mx-14">
                {/* Left Side of Navigation Bar, comprising of logo and links */}
                <div className="flex flex-row my-3">
                    {/* The svg has some strange artifacts around the edges of the letters which will need to be resolved eventually */}
                    <Image className="mr-7" priority src="logo.svg" height={60} width={60} alt="GBC Logo"/>

                    {/* Navigation Links to different sections of the home page + other pages */}
                    <div className={`${poppins.className} flex flex-row gap-8 text-white items-center text-lg`}>
                        <Link href="/"> Home </Link>
                        <Link href="/"> Games </Link>
                        <Link href="/"> About Us </Link>
                        <Link href="/"> How it Works </Link>
                        <Link href="/frequently-asked-questions"> FAQ </Link>
                        <Link href="/"> Contact </Link>
                    </div>
                </div>

                {/* Right Side of Navigation Bar, featuring social medias */}
                <div className="flex flex-row gap-x-4 items-center">
                    <Link className="flex-shrink-0" href="https://x.com/GameBuilderClub" target="_blank"> <Image priority src="twitter.svg" height={30} width={30} alt="X (Formerly Twitter) Logo"/> </Link>
                    <Link className="flex-shrink-0" href="https://www.instagram.com/gamebuildersclub/" target="_blank"> <Image priority src="instagram.svg" height={27} width={27} alt="Instagram Logo"/> </Link>
                    <Link className="flex-shrink-0" href="https://discord.gg/ZZU5xQbv8K" target="_blank"> <Image priority src="discord.svg" height={35} width={35} alt="Discord Logo"/> </Link>
                </div>
            </div>

            {/* Red Accent */}
            <div className="bg-darkRed h-1"> </div>
           
            
        </div>
    );
}