import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export type content = {
    title: string;
    subTitle?: string;
    content: string;
    thumbnail: string | StaticImageData;
};

export const contentService = [
    {
        title: "FULL PACKAGES",
        content:
            "Packages of full services for 2,3, or 4 hours of facial and body massages are particularly popular among our customers",
        thumbnail: images.fallback,
    },
    {
        title: "VIP SERVICE",
        content:
            "With the desire to fulfill customer satisfaction, Sen Spa specifically designed a VIP floor equipped with a complete spa system, always ready to operate at full capacity in the evening.",
        thumbnail: images.fallback,
    },
    {
        title: "BODY CARE & RELAXATION",
        subTitle: "SERVICES",
        content:
            "At Sen, we serve a full range of massages popular in the world, such as essential oil massage, Thai massage, Japanese massage, Swedish massage etc.",
        thumbnail: images.fallback,
    },
    {
        title: "SKINCARE & BEAUTY SERVICES FOR",
        subTitle: "FACE",
        content:
            "Sen Spa uses Physio Natura facial products which include natural ingredients from Europe and manufactured with modern technology in Italy and no artificial additives.",
        thumbnail: images.fallback,
    },
];
