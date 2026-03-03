import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IConceptItem {
    id: number;
    title: string;
    description: string;
    thumbnail: string | StaticImageData;
    subtitle: string;
}

export const introductConceptData = [
    images.decor9,
    images.decor10,
    images.decor11,
    images.decor12,
];
