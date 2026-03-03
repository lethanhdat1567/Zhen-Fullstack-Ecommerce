import { images } from "@/assets/images";
import { CategorySlug } from "../../data";
import { StaticImageData } from "next/image";

// data.ts
export interface INewsSideItem {
    date: string;
    content: string;
    thumbnail: string | StaticImageData;
}

export interface INewsSideData {
    large: INewsSideItem;
    small: INewsSideItem[];
}

export const newsSideMockData: Record<CategorySlug, INewsSideData> = {
    news: {
        large: {
            date: "17.11.2020",
            content: "Tin nổi bật chăm sóc da mùa đông",
            thumbnail: images.fallback,
        },
        small: [
            {
                date: "17.11.2020",
                content: "Muối hồng Himalaya có gì đặc biệt?",
                thumbnail: images.fallback,
            },
            {
                date: "17.11.2020",
                content: "Foot massage giúp ngủ ngon hơn",
                thumbnail: images.fallback,
            },
        ],
    },

    event: {
        large: {
            date: "20.11.2020",
            content: "Sự kiện khai trương chi nhánh mới",
            thumbnail: images.bg_footer,
        },
        small: [
            {
                date: "20.11.2020",
                content: "Workshop chăm sóc da miễn phí",
                thumbnail: images.bg_footer,
            },
            {
                date: "20.11.2020",
                content: "Ưu đãi khách hàng VIP",
                thumbnail: images.bg_footer,
            },
        ],
    },

    sale: {
        large: {
            date: "25.11.2020",
            content: "Giảm giá 50% toàn bộ dịch vụ",
            thumbnail: images.VNFlat,
        },
        small: [
            {
                date: "25.11.2020",
                content: "Combo massage chỉ 499k",
                thumbnail: images.VNFlat,
            },
            {
                date: "25.11.2020",
                content: "Tặng voucher 200k",
                thumbnail: images.VNFlat,
            },
        ],
    },

    blog: {
        large: {
            date: "01.12.2020",
            content: "Cách chăm sóc da tại nhà hiệu quả",
            thumbnail: images.fallback,
        },
        small: [
            {
                date: "01.12.2020",
                content: "Routine skincare cơ bản",
                thumbnail: images.fallback,
            },
            {
                date: "01.12.2020",
                content: "5 sai lầm khi rửa mặt",
                thumbnail: images.fallback,
            },
        ],
    },
};
