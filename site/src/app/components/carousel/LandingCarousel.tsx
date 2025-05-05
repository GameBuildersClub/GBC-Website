import Image from "next/image";

import styles from './styles.module.css'

export default function LandingCarousel() {
    return(
        <div>
            <Image className={styles.image} src="/images/Spring_2024_Fair 1.png" alt="Landing Page Image" width={400} height={400}></Image>
        </div>
    );
}