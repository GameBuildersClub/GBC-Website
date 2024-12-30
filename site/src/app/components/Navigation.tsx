import Image from "next/image";
import Link from "next/link";

import { poppins } from "../fonts/poppins";

export default function Navigation () {
    return(
        <div className="bg-darkGrey flex flex-col">

            {/* Left Side of Navigation Bar, comprising of logo and links */}
            <div className="flex flex-row my-3">
                 {/* The svg has some strange artifacts around the edges of the letters which will need to be resolved eventually */}
                <Image priority src="logo.svg" height={57} width={57} alt="GBC Logo"/>

                <div className={`${poppins.className} flex flex-row gap-8 text-white items-center text-lg`}>
                    <Link href="/"> Home </Link>
                    <Link href="/"> Games </Link>
                    <Link href="/"> About Us </Link>
                    <Link href="/"> How it Works </Link>
                    <Link href="/"> FAQ </Link>
                    <Link href="/"> Contact </Link>
                </div>
            </div>

            {/* Red Accent */}
            <div className="bg-darkRed h-1"> </div>
           
            
        </div>
    );
}