'use client'

import { useState } from "react";

import { outfit } from "../../fonts/outfit";
import { poppins } from "../../fonts/poppins";

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
        <div className="cursor-pointer">
            {/* This div contains the question and is clickable. When clicked, it'll reveal or unreveal the corresonding answer */}
            <div onClick={handleClick}>
                {/* Question content */}
                <h1 className={`text-2xl ${outfit.className} ${isClicked ? 'text-primary' : `text-darkGrey`}`}>{question}</h1>
            </div>
            
            {/* Answer content */}
            {isClicked && <p className={`${poppins.className}`}>{answer}</p>}
            
        </div>
    );
}