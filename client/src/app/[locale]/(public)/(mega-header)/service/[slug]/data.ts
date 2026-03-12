import { images } from "@/assets/images";
import { StaticImageData } from "next/image";

export interface IServiceStep {
    title: string;
    content: string;
}
export interface IServiceItem {
    id: string;
    code?: string;
    category?: string;
    keywords?: string[];
    title: string;
    price: number;
    thumbnail: string | StaticImageData;
    gallery: (string | StaticImageData)[];

    description?: string[];
    introduction?: string[];
    steps?: IServiceStep[];
}
export type ServiceSlug =
    | "cham-soc-toan-than"
    | "cham-soc-da-mat"
    | "thu-gian-tay-chan"
    | "dich-vu-tron-goi"
    | "dich-vu-vip";

export const serviceMockData = {
    "website-design-service": [
        {
            id: "massage-thai-60p",
            code: "THAI",
            category: "Chăm sóc toàn thân",
            keywords: ["massage thai", "massage kéo giãn", "massage toàn thân"],
            title: "Massage kiểu Thái truyền thống (60 phút)",
            price: 660000,
            thumbnail: images.DSC5622,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: [
                "Kéo giãn cơ thể theo phong cách Thái",
                "Bấm huyệt tăng tuần hoàn máu",
                "Giảm đau nhức vai gáy",
            ],
            introduction: [
                "Massage Thái tập trung vào kéo giãn sâu toàn bộ cơ thể.",
                "Phù hợp với người ngồi nhiều, căng cơ vai gáy.",
            ],
            steps: [
                { title: "Bước 1", content: "Làm nóng cơ." },
                { title: "Bước 2", content: "Kéo giãn toàn thân." },
                { title: "Bước 3", content: "Bấm huyệt." },
            ],
        },

        {
            id: "massage-tinh-dau-60p",
            code: "AROMA",
            category: "Chăm sóc toàn thân",
            keywords: ["massage tinh dầu", "aromatherapy", "massage thư giãn"],
            title: "Massage tinh dầu thư giãn (60 phút)",
            price: 770000,
            thumbnail: images.USAFlat,
            gallery: [images.USAFlat, images.VNFlat, images.DSC5622],
            description: [
                "Massage nhẹ nhàng với tinh dầu thiên nhiên",
                "Giúp ngủ ngon hơn",
                "Thư giãn tinh thần",
            ],
            introduction: [
                "Liệu pháp aromatherapy giúp cân bằng cảm xúc.",
                "Phù hợp với khách cần thư giãn nhẹ.",
            ],
            steps: [
                { title: "Bước 1", content: "Chọn tinh dầu." },
                { title: "Bước 2", content: "Massage nhẹ." },
            ],
        },

        {
            id: "massage-da-nong-75p",
            code: "HOTSTONE",
            category: "Chăm sóc toàn thân",
            keywords: ["massage đá nóng", "hot stone", "giảm stress"],
            title: "Massage đá nóng trị liệu (75 phút)",
            price: 820000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622],
            description: [
                "Đá nóng giữ nhiệt lâu",
                "Giảm căng cơ sâu",
                "Tăng tuần hoàn máu",
            ],
            introduction: [
                "Đá nóng giúp làm mềm cơ và giảm đau nhanh.",
                "Phù hợp với người stress nặng.",
            ],
            steps: [
                { title: "Bước 1", content: "Làm nóng cơ." },
                { title: "Bước 2", content: "Đặt đá nóng." },
                { title: "Bước 3", content: "Massage sâu." },
            ],
        },
        {
            id: "massage-da-nong-90p",
            code: "HOTSTONE",
            category: "Chăm sóc toàn thân",
            keywords: ["massage đá nóng", "hot stone", "giảm stress"],
            title: "Massage đá nóng trị liệu (75 phút)",
            price: 820000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622],
            description: [
                "Đá nóng giữ nhiệt lâu",
                "Giảm căng cơ sâu",
                "Tăng tuần hoàn máu",
            ],
            introduction: [
                "Đá nóng giúp làm mềm cơ và giảm đau nhanh.",
                "Phù hợp với người stress nặng.",
            ],
            steps: [
                { title: "Bước 1", content: "Làm nóng cơ." },
                { title: "Bước 2", content: "Đặt đá nóng." },
                { title: "Bước 3", content: "Massage sâu." },
            ],
        },
        {
            id: "massage-da-nong-100p",
            code: "HOTSTONE",
            category: "Chăm sóc toàn thân",
            keywords: ["massage đá nóng", "hot stone", "giảm stress"],
            title: "Massage đá nóng trị liệu (75 phút)",
            price: 820000,
            thumbnail: images.VNFlat,
            gallery: [images.VNFlat, images.DSC5622],
            description: [
                "Đá nóng giữ nhiệt lâu",
                "Giảm căng cơ sâu",
                "Tăng tuần hoàn máu",
            ],
            introduction: [
                "Đá nóng giúp làm mềm cơ và giảm đau nhanh.",
                "Phù hợp với người stress nặng.",
            ],
            steps: [
                { title: "Bước 1", content: "Làm nóng cơ." },
                { title: "Bước 2", content: "Đặt đá nóng." },
                { title: "Bước 3", content: "Massage sâu." },
            ],
        },
    ],

    "cham-soc-da-mat": [
        {
            id: "vitamin-c-75p",
            code: "VITC",
            category: "Chăm sóc da mặt",
            keywords: ["facial vitamin c", "làm sáng da", "chống oxy hóa"],
            title: "Liệu pháp da trắng rạng rỡ với Vitamin C (75 phút)",
            price: 1430000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: ["Làm sáng da", "Chống oxy hoá"],
            introduction: [
                "Liệu pháp Vitamin C giúp cải thiện sắc tố da, làm sáng và đều màu da một cách tự nhiên.",
                "Tinh chất chống oxy hóa mạnh giúp bảo vệ da khỏi tác hại môi trường và kích thích sản sinh collagen.",
                "Sau liệu trình, làn da trở nên rạng rỡ, mịn màng và tràn đầy sức sống.",
            ],
            steps: [
                { title: "Bước 1", content: "Làm sạch da." },
                { title: "Bước 2", content: "Đắp serum Vitamin C." },
            ],
        },
        {
            id: "vitamin-c-75p",
            code: "VITC",
            category: "Chăm sóc da mặt",
            keywords: ["facial vitamin c", "làm sáng da", "chống oxy hóa"],
            title: "Liệu pháp da trắng rạng rỡ với Vitamin C (75 phút)",
            price: 1430000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: ["Làm sáng da", "Chống oxy hoá"],
            introduction: [
                "Liệu pháp Vitamin C giúp cải thiện sắc tố da, làm sáng và đều màu da một cách tự nhiên.",
                "Tinh chất chống oxy hóa mạnh giúp bảo vệ da khỏi tác hại môi trường và kích thích sản sinh collagen.",
                "Sau liệu trình, làn da trở nên rạng rỡ, mịn màng và tràn đầy sức sống.",
            ],
            steps: [
                { title: "Bước 1", content: "Làm sạch da." },
                { title: "Bước 2", content: "Đắp serum Vitamin C." },
            ],
        },
    ],

    "thu-gian-tay-chan": [
        {
            id: "an-huyet-tay-chan-90p",
            code: "HANDFOOT",
            category: "Thư giãn tay chân",
            keywords: [
                "ấn huyệt tay chân",
                "massage tay chân",
                "tuần hoàn máu",
            ],
            title: "Trị liệu ấn huyệt tay và chân (90 phút)",
            price: 550000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: ["Bấm huyệt tay chân", "Tăng tuần hoàn"],
            introduction: [
                "Liệu pháp tập trung vào các huyệt đạo quan trọng ở tay và chân, giúp kích thích lưu thông máu và giảm tê mỏi.",
                "Kết hợp ngâm chân thảo dược giúp đào thải độc tố và mang lại cảm giác thư giãn sâu.",
                "Phù hợp với người thường xuyên di chuyển, đứng lâu hoặc làm việc văn phòng.",
            ],
            steps: [{ title: "Bước 1", content: "Ngâm chân thảo dược." }],
        },

        {
            id: "an-huyet-tay-chan-90p",
            code: "HANDFOOT",
            category: "Thư giãn tay chân",
            keywords: [
                "ấn huyệt tay chân",
                "massage tay chân",
                "tuần hoàn máu",
            ],
            title: "Trị liệu ấn huyệt tay và chân (90 phút)",
            price: 550000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: ["Bấm huyệt tay chân", "Tăng tuần hoàn"],
            introduction: [
                "Liệu pháp tập trung vào các huyệt đạo quan trọng ở tay và chân, giúp kích thích lưu thông máu và giảm tê mỏi.",
                "Kết hợp ngâm chân thảo dược giúp đào thải độc tố và mang lại cảm giác thư giãn sâu.",
                "Phù hợp với người thường xuyên di chuyển, đứng lâu hoặc làm việc văn phòng.",
            ],
            steps: [{ title: "Bước 1", content: "Ngâm chân thảo dược." }],
        },
    ],

    "dich-vu-tron-goi": [
        {
            id: "oasis-1h30",
            code: "OASIS",
            category: "Dịch vụ trọn gói",
            keywords: ["gói massage", "massage + facial", "spa package"],
            title: "Oasis (1.5h)",
            price: 1100000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: ["Massage", "Chăm sóc da mặt"],
            introduction: [
                "Oasis là gói chăm sóc toàn diện kết hợp massage thư giãn và chăm sóc da mặt.",
                "Liệu trình giúp cơ thể được thả lỏng hoàn toàn đồng thời nuôi dưỡng làn da khỏe mạnh.",
                "Phù hợp cho khách hàng muốn trải nghiệm spa trọn gói trong thời gian ngắn.",
            ],
            steps: [{ title: "Bước 1", content: "Massage + facial." }],
        },

        {
            id: "oasis-1h30",
            code: "OASIS",
            category: "Dịch vụ trọn gói",
            keywords: ["gói massage", "massage + facial", "spa package"],
            title: "Oasis (1.5h)",
            price: 1100000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: ["Massage", "Chăm sóc da mặt"],
            introduction: [
                "Oasis là gói chăm sóc toàn diện kết hợp massage thư giãn và chăm sóc da mặt.",
                "Liệu trình giúp cơ thể được thả lỏng hoàn toàn đồng thời nuôi dưỡng làn da khỏe mạnh.",
                "Phù hợp cho khách hàng muốn trải nghiệm spa trọn gói trong thời gian ngắn.",
            ],
            steps: [{ title: "Bước 1", content: "Massage + facial." }],
        },
    ],

    "dich-vu-vip": [
        {
            id: "sen-romance-3h30",
            code: "TWO",
            category: "Dịch vụ VIP",
            keywords: [
                "massage body",
                "massage senspa",
                "massage cặp đôi",
                "vip spa",
            ],
            title: "SEN Romance -Dịch vụ xông hơi massage cặp đôi (3.5h)",
            price: 5720000,
            thumbnail: images.fallback,
            gallery: [images.DSC5622, images.USAFlat, images.VNFlat],
            description: [
                "Xông hơi thảo dược",
                "Ngâm bồn hoa",
                "Massage cặp đôi",
            ],
            introduction: [
                "Thải độc cơ thể hiện nay là cụm từ quá quen thuộc với mọi gia đình, mọi tầng lớp và đặc biệt là chị em phụ nữ. Các chị em luôn biết quan tâm chăm sóc bản thân với thức ăn healthy, và những liệu pháp thải độc như: đắp mặt nạ dưỡng da, sử dụng thực phẩm chức năng, tập thể dục với nhiều phương pháp khác nhau, v.v…",
                "Nhằm đáp ứng nhu cầu của các chị em, Sen Spa tự hào cung cấp một dịch vụ đặc biệt giải độc cho cơ thể –  giúp chị em khỏe hơn, đẹp hơn và tràn đầy năng lượng – A Journey for Two. Tại Sen Spa, chị em phụ nữ có thể tận hưởng cuộc sống một cách trọn vẹn hơn khi cùng chia sẻ những giờ phút vừa làm đẹp chăm sóc bản thân, vừa thư giãn cùng với một nửa kia của mình. Không những giúp cho mọi người cùng khoẻ mà còn tăng thêm tình cảm, sự thấu hiểu lẫn nhau và mang lại nhiều điều mới mẻ cùng nhau lưu giữ những kỷ niệm đẹp.",
                "Dịch vụ Massage thải độc cơ thể dành cho cặp đôi A Journey For Two được thực hiện tại phòng VIP với hệ thống phòng xông hơi, hồ thủy lực và phòng tắm vòi sen riêng dành cho 2 người theo hành trình thú vị sau.",
            ],
            steps: [
                { title: "Bước 1", content: "Xông hơi thảo dược." },
                { title: "Bước 2", content: "Ngâm bồn thư giãn." },
                {
                    title: "Bước 3",
                    content: "Massage tinh dầu cặp đôi.",
                },
            ],
        },
    ],
};
