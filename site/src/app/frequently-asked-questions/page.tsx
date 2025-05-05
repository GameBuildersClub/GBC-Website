'use client'

import Image from "next/image";

import { useState, useCallback, useEffect } from "react";

import Navigation from "../components/Navigation";

import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";

import { faq } from "../data/faq";

import { outfit } from "../fonts/outfit";
import { poppins } from "../fonts/poppins";

// Inspriation https://www.admissions.uga.edu/admissions/first-year/first-year-faq/

export default function FAQ () {
    const [isExpandAllClicked, setIsExpandAllClicked] = useState(false)

    // Handler for expanding all the faq options
    const handleExpandAll = () => {
        setIsExpandAllClicked(!isExpandAllClicked)
    }

    const isBreakPoint = useMediaQuery(500)

    return(
        <div>
            <Navigation/>

            {/* Banner */}
            <div className="relative h-80">
                <Image className="object-cover w-full" src="/images/FAQ_Banner.png" alt="A photo from our Fall 2023 game showcase" layout="fill"/>
                
                {/* Dim Image */}
                <div className="absolute opacity-50 bg-black h-full w-full"></div>

                {/* "Frequently Asked Questions" or "FAQ" */}
                {isBreakPoint ? (
                    <h1 className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl ${outfit.className}`}>FAQ</h1>
                    ) : (
                    <h1 className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl ${outfit.className}`}>Frequently Asked Questions</h1>)
                }

            </div>

            {/* Body */}
            <div className="flex flex-col mt-8 mb-56 mx-5 md:mx-12 xl:mx-96">
                {/* Description */}
                <p className={`${poppins.className}`}> Below you will find some commonly asked questions about Game Builders Club. If you still have further questions, please reach out to us via Discord or email.</p>

                {/* Expand or minimize all faqs button */}
                <div className="flex flex-row justify-end my-3">
                    <p className={`cursor-pointer text-primary w-fit hover:underline ${poppins.className}`} onClick={handleExpandAll}>{!isExpandAllClicked ? "EXPAND ALL" : "CLOSE ALL"}</p>
                </div>

                {/* Map data of frequently asked questions to the corresponding component */}
                { faq.map((entry, index) => <FrequentlyAskedQuestion expandState={isExpandAllClicked} question={entry.question} answer={entry.answer} key={index}/> )}
            </div>
        </div>
    );
}

// Logic to render "Frequently Asked Questions" or "FAQ" depending on screen size
// Reference https://github.com/vercel/next.js/discussions/14810#discussioncomment-8606715
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