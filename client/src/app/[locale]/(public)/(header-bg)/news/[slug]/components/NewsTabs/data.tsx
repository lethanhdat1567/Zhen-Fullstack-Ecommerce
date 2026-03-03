import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export type NewsTabsData = {
    title: string;
    href: string;
    thumbnail: string | StaticImageData;
};

export const newsTabsData: NewsTabsData[] = [
    {
        title: "Blog Khỏe và đẹp",
        href: "/category/blog",
        thumbnail: images.icon_blog_khoe,
    },

    {
        title: "Khuyến mãi",
        href: "/category/sale",
        thumbnail: images.icon_tag,
    },
    {
        title: "Sự kiện",
        href: "/category/event",
        thumbnail: images.icon_lich,
    },
    {
        title: "Tin tức",
        href: "/category/news",
        thumbnail: images.icon_news,
    },
];
