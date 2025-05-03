'use client'

import { useState } from "react";

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
            {/* Clickable */}
            <div onClick={handleClick}>
                <h1 className="text-darkGrey">{question}</h1>
            </div>
            
            {/* Display answer if clicked */}
            {isClicked && <p>{answer}</p>}
            
        </div>
    );
}