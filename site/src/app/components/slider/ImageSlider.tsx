'use client'

import Image from "next/image";

import styles from './styles.module.css';

import { useState, useEffect } from "react";

import { outfit } from "@/app/fonts/outfit";
import { poppins } from "@/app/fonts/poppins";

export default function ImageSlider() {

    const [imageIndex, setImageIndex] = useState(0)
    const [isHover, setIsHover] = useState(false);
   
    const img1 = "/images/Spring_2025_Decked_Out_Group_Photo.png"
    const img2 = "/images/Fall_2023_Showcase 1.png"
    const img3 = "/images/Spring_2024_Fair 1.png"

    const  images = [img1, img2, img3]

    useEffect(() => {
        const interval = setInterval(() => {
            // Pause the image slider if mouse is hovering over
            if (isHover) return;

            // Increment image index
            setImageIndex(imageIndex => (imageIndex + 1) % images.length)
        }, 5000) // Every five seconds

        return () => {
            clearInterval(interval);
        };
    }, [isHover])

    return(
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={styles.container}>
            
            {/* Images */}
            <div className={styles.slider}>
                {images.map(url => (
                    <Image key={url} style={{translate: `${-100 * imageIndex}%`}} className={`${styles.image}`} quality={100} loading="eager" src={url} alt="Landing Page Image" width={12000} height={4000}></Image>
                ))}
            </div>

            <div className={styles.dim}></div>

            {/* Text */}
            <div className={styles.textContainer}>
                <h1 className={`${outfit.className} ${styles.h1}`}>Game Builders Club</h1>
                <h2 className={`${poppins.className} ${styles.h2}`}>Building games together at the University of Georgia since 2021.</h2>
            </div>

            {/* Index Buttons */}
            <div className={styles.indexContainer}>
                {images.map((_, index) => (
                    <button key={index} className={styles.indexButton} onClick={() => setImageIndex(index)} aria-label={`View Image ${index}`}>
                        {index === imageIndex ? 
                            <Image className={styles.indexButton} quality={500} loading="eager" src="filled_ellipse.svg" alt="Landing Page Image" width={15} height={15}></Image> 
                            : 
                            <Image className={styles.indexButton} quality={500} loading="eager" src="ellipse.svg" alt="Landing Page Image" width={15} height={15}></Image>
                        }
                    </button>
                ))}
            </div>
            
        </div>
    );
}