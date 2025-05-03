'use client'

import { useState } from "react";

import Image from "next/image";

import { outfit } from "../fonts/outfit";
import { poppins } from "../fonts/poppins";

interface FrequentlyAskedQuestionsProp {
    question: string;
    answer: string;
}


export default function FrequentlyAskedQuestion( {question, answer}:FrequentlyAskedQuestionsProp ) {
    const [isClicked, setIsclicked] = useState(false)

    // Event handler for when a question is clicked
    // Flips the 'isClicked' boolean to hide or reveal
    // a question's corresponding answer
    const handleClick = () => {
        setIsclicked(!isClicked);
    }
    
    return(
        <div className="cursor-pointer my-3">
            {/* This div contains the question and is clickable. When clicked, it'll reveal or unreveal the corresonding answer */}
            <div className="pb-2 flex flex-row justify-between" onClick={handleClick}>
                {/* Question content */}
                <h1 className={`font-medium text-2xl ${outfit.className} hover:text-primary ${isClicked ? 'text-primary' : `text-darkGrey`}`}>{question}</h1>
                {/* Plus/Minus Icon */}
                <Image priority src="faq_plus.svg" height={21} width={21} alt="Expand Icon"/> 
            </div>

            {/* Underline */}
            <hr className="border-darkGrey border-[1.5px]"></hr>

            {/* Answer content */}
            {isClicked && <p className={`pt-2 font-medium ${poppins.className}`}>{answer}</p>}
            
        </div>
    );
}