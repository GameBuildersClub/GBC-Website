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
    const [isHovering, setIsHovering] = useState(false)

    // Event handler for when a question is clicked
    // Flips the 'isClicked' boolean to hide or reveal
    // a question's corresponding answer
    const handleClick = () => {
        setIsclicked(!isClicked);
    }

    const handleOnMouseEnter = () => {
        setIsHovering(true)
    }

    const handleOnMouseLeave = () => {
        setIsHovering(false)
    }
    
    return(
        <div className="cursor-pointer my-3">
            {/* This div contains the question and is clickable. When clicked, it'll reveal or unreveal the corresonding answer */}
            <div className="pb-2 flex flex-row justify-between" onClick={handleClick} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                {/* Question content */}
                <h1 className={`font-medium text-2xl ${outfit.className} hover:text-primary ${isClicked ? 'text-primary' : `text-darkGrey`}`}>{question}</h1>

                {/* Icon */}
                {/* If an faq is clicked, switch from expand + to minimize - icon and vice versa */}
                {!isClicked ? (
                    // Display the red expan icon on hover, otherwise gray 
                    !isHovering ? (
                        <Image width={21} height={21} alt="Expan Icon" src="faq_plus_gray.svg"></Image>
                    ) : (
                        <Image width={21} height={21} alt="Expan Icon" src="faq_plus_red.svg"></Image>
                    )
                    
                    ) : (
                        <Image width={21} height={21} alt="Expan Icon" src="faq_minimize.svg"></Image>)
                }

            </div>

            {/* Underline */}
            <hr className="border-darkGrey border-[1.5px]"></hr>

            {/* Answer content */}
            {isClicked && <p className={`cursor-text pt-2 font-medium ${poppins.className}`}>{answer}</p>}
            
        </div>
    );
}