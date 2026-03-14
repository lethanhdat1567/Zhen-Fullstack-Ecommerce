import Image from "next/image";
import AboutData from "./components/AboutData/AboutData";
import { images } from "@/assets/images";

function About() {
    return (
        <div id="about" className="relative w-full py-20">
            <Image
                src={images.bg_about}
                alt="Decor"
                fill
                className="-z-10 hidden object-cover md:block"
                priority
            />
            <div className="relative container flex h-full items-center">
                <AboutData />
            </div>
            <div className="absolute -top-1.25 right-60 -z-10 hidden h-full w-70 lg:block">
                <Image
                    src={images.bg_spa}
                    alt="Decor"
                    fill
                    className="object-cover"
                    style={{
                        filter: "sepia(1) hue-rotate(190deg) saturate(500%) brightness(30%)",
                    }}
                    priority
                />
            </div>
        </div>
    );
}

export default About;
