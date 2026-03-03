import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export type content = {
    title: string;
    subTitle: string;
    href: string;
    thumbnail: string | StaticImageData;
};

export const contentSwiper = [
    {
        title: "Sen Spa",
        subTitle: "Luxury space, mix modern and classical",
        href: "/home",
        thumbnail: images.fallback,
    },
    {
        title: "Sen Spa",
        subTitle: "Luxury space, mix modern and classical",
        href: "/home",
        thumbnail: images.USAFlat,
    },
    {
        title: "Sen Spa",
        subTitle: "Luxury space, mix modern and classical",
        href: "/home",
        thumbnail: images.VNFlat,
    },
];
