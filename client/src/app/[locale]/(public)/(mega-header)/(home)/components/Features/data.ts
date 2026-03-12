import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export type content = {
    title: string;
    subTitle: string;
    content: string;
    thumbnail: string | StaticImageData;
};

export const contentFeatures = [images.ft1, images.ft2, images.ft3];
