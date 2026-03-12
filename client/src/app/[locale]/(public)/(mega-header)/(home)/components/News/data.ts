import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export type contentNews = {
    content: string;
    date: string;
    thumbnail: string | StaticImageData;
};

export const contentNewsItem: contentNews[] = [
    {
        date: "17.11.2020",
        content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
        thumbnail: images.fallback,
    },
    {
        date: "17.11.2020",
        content: "Những lợi ích của không ngờ của muối hồng Himalaya",
        thumbnail: images.fallback,
    },
    {
        date: "17.11.2020",
        content: "Những lợi ích của foot massage mà bạn nên biết",
        thumbnail: images.fallback,
    },
    {
        date: "17.11.2020",
        content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
        thumbnail: images.fallback,
    },
];
