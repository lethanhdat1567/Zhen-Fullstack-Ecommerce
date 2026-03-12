import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface ICategoryItem {
    content: string;
    date: string;
    thumbnail: string | StaticImageData;
}
export type CategorySlug = "news" | "event" | "sale" | "blog";

export const categoryMockData = {
    news: [
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
    ],
    event: [
        {
            date: "17.11.2020",
            content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
            thumbnail: images.bg_service,
        },
        {
            date: "17.11.2020",
            content: "Những lợi ích của không ngờ của muối hồng Himalaya",
            thumbnail: images.bg_service,
        },
        {
            date: "17.11.2020",
            content: "Những lợi ích của foot massage mà bạn nên biết",
            thumbnail: images.bg_service,
        },
        {
            date: "17.11.2020",
            content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
            thumbnail: images.bg_service,
        },
    ],
    sale: [
        {
            date: "17.11.2020",
            content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
            thumbnail: images.DSC5622,
        },
        {
            date: "17.11.2020",
            content: "Những lợi ích của không ngờ của muối hồng Himalaya",
            thumbnail: images.DSC5622,
        },
        {
            date: "17.11.2020",
            content: "Những lợi ích của foot massage mà bạn nên biết",
            thumbnail: images.DSC5622,
        },
        {
            date: "17.11.2020",
            content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
            thumbnail: images.DSC5622,
        },
    ],
    blog: [
        {
            date: "17.11.2020",
            content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
            thumbnail: images.bg_service,
        },
        {
            date: "17.11.2020",
            content: "Những lợi ích của không ngờ của muối hồng Himalaya",
            thumbnail: images.bg_service,
        },
        {
            date: "17.11.2020",
            content: "Những lợi ích của foot massage mà bạn nên biết",
            thumbnail: images.bg_service,
        },
        {
            date: "17.11.2020",
            content: "Chăm sóc da mặt giúp da mịn giúp sáng da",
            thumbnail: images.bg_service,
        },
    ],
};
