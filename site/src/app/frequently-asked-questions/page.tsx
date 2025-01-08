import Image from "next/image";

import Navigation from "../components/Navigation";

import { outfit } from "../fonts/outfit";

export default function FAQ () {
    return(
        <div>
            <Navigation/>

            <div className="relative h-80">
                <Image className="object-cover w-full" src="/images/FAQ_Banner.png" alt="A photo from our Fall 2023 game showcase" layout="fill"/>
                
                <div className="absolute opacity-50 bg-black h-full w-full"></div>

                <h1 className={`absolute left-20 top-32 text-white text-5xl ${outfit.className}`}>Frequently Asked Questions</h1>
            </div>

            
        </div>
    );
}