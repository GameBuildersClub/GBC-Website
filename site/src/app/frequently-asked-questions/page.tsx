'use client'

import Image from "next/image";

import Navigation from "../components/Navigation";

import FrequentlyAskedQuestion from "../components/FrequentlyAskedQuestion";

import { data } from "./data";

import { outfit } from "../fonts/outfit";
import { poppins } from "../fonts/poppins";

// Inspriation https://www.admissions.uga.edu/admissions/first-year/first-year-faq/

export default function FAQ () {
    return(
        <div>
            <Navigation/>

            <div className="relative h-80">
                <Image className="object-cover w-full" src="/images/FAQ_Banner.png" alt="A photo from our Fall 2023 game showcase" layout="fill"/>
                
                <div className="absolute opacity-50 bg-black h-full w-full"></div>

                <h1 className={`absolute left-20 top-32 text-white text-5xl ${outfit.className}`}>Frequently Asked Questions</h1>
            </div>

            {/* Map data of frequently asked questions to the corresponding component */}
            <div className="flex flex-col mx-72 mt-8">
                <p className={`${poppins.className}`}> Below you will find some commonly asked questions about Game Builders Club. If you still have further questions, please reach out to us via Discord or email.</p>

                { data.map((entry, index) => <FrequentlyAskedQuestion question={entry.question} answer={entry.answer} key={index}/> )}
            </div>
        </div>
    );
}