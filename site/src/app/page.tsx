import Image from "next/image";

import Navigation from "./components/Navigation";
import LandingCarousel from "./components/carousel/LandingCarousel";

export default function Home() {
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Navigation/>
      <LandingCarousel/>
    </div>
  );
}
