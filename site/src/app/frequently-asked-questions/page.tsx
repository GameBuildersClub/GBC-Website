'use client'

import Image from "next/image";

import { useState } from "react";

import Navigation from "../components/Navigation";

import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";

import { faq } from "../data/faq";

import { outfit } from "../fonts/outfit";
import { poppins } from "../fonts/poppins";

// Inspriation https://www.admissions.uga.edu/admissions/first-year/first-year-faq/

export default function FAQ () {
    const [isExpandAllClicked, setIsExpandAllClicked] = useState(false)

    const handleExpandAll = () => {
        setIsExpandAllClicked(!isExpandAllClicked)
        console.log("click")
    }

    return(
        <div>
            <Navigation/>

            {/* Banner */}
            <div className="relative h-80">
                <Image className="object-cover w-full" src="/images/FAQ_Banner.png" alt="A photo from our Fall 2023 game showcase" layout="fill"/>
                
                {/* Dim Image */}
                <div className="absolute opacity-50 bg-black h-full w-full"></div>

                <h1 className={`absolute left-20 top-32 text-white text-5xl ${outfit.className}`}>Frequently Asked Questions</h1>
            </div>

            {/* Map data of frequently asked questions to the corresponding component */}
            <div className="flex flex-col mt-8 mb-56 mx-5 md:mx-12 xl:mx-96">
                <p className={`${poppins.className}`}> Below you will find some commonly asked questions about Game Builders Club. If you still have further questions, please reach out to us via Discord or email.</p>

                {/* Expand or minimize all faqs */}
                <div className="flex flex-row justify-end my-3">
                    <p className={`cursor-pointer text-primary w-fit hover:underline ${poppins.className}`} onClick={handleExpandAll}>{!isExpandAllClicked ? "EXPAND ALL" : "CLOSE ALL"}</p>
                </div>

                { faq.map((entry, index) => <FrequentlyAskedQuestion expandState={isExpandAllClicked} question={entry.question} answer={entry.answer} key={index}/> )}
            </div>
        </div>
    );
}