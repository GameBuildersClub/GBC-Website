'use client'

import Image from "next/image";

import styles from './styles.module.css';

import { useState } from "react";

import { outfit } from "@/app/fonts/outfit";
import { poppins } from "@/app/fonts/poppins";


export default function LandingCarousel() {

    const [imageIndex, setImageIndex] = useState(0)
   
    const img1 = "/images/Spring_2025_Decked_Out_Group_Photo.png"
    const img2 = "/images/Fall_2023_Showcase 1.png"
    const img3 = "/images/Spring_2024_Fair 1.png"

    const  images = [img1, img2, img3]

    const onClickLeft = () => {
        setImageIndex((imageIndex - 1 + images.length ) % images.length)
    }

    const onClickRight = () => {
        setImageIndex((imageIndex + 1) % images.length)
    }

    return(
        <div className={styles.container}>
            
            <div className={styles.dim}></div>

            {/* Text */}
            <div className={styles.textContainer}>
                <h1 className={`${outfit.className} ${styles.h1}`}>Game Builders Club</h1>
                <h2 className={`${poppins.className} ${styles.h2}`}>Building games together at the University of Georgia since 2021.</h2>
            </div>

            <Image className={styles.image} quality={100} loading="eager" src={images[imageIndex]} alt="Landing Page Image" width={12000} height={4000}></Image>
            <button className={styles.buttonLeft} onClick={onClickLeft}></button>
            <button className={styles.buttonRight} onClick={onClickRight}></button>
        </div>
    );
}