import Image from "next/image";

export default function Home() {
  return (
    <div>

      <Image priority src="logo.svg" height={32} width={32} alt="GBC Logo"/>

    </div>
  );
}
