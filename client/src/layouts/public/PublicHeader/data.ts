export type NavType = {
    title?: string;
    href: string;
    children?: NavType[];
    tabs?: NavType[];
};

export const mainNavItems: NavType[] = [
    {
        title: "Giới thiệu",
        href: "/introduce",
    },
    {
        title: "Dịch vụ",
        href: "/services/dich-vu-vip",
        children: [
            {
                title: "Chăm sóc toàn thân",
                href: "/services/cham-soc-toan-than",
            },
            {
                title: "Chăm sóc da mặt",
                href: "/services/cham-soc-da-mat",
            },
            {
                title: "Thư giãn tay & chân",
                href: "/services/thu-gian-tay-chan",
            },
            {
                title: "Dịch vụ trọn gói",
                href: "/services/dich-vu-tron-goi",
            },
            {
                title: "Dịch vụ VIP",
                href: "/services/dich-vu-vip",
            },
        ],
    },

    {
        title: "Sản phẩm",
        href: "/product/can-ho-dich-vu",
        tabs: [
            {
                title: "Sản phẩm Spa",
                href: "/product/san-pham-spa",
            },
        ],
    },
    {
        title: "Tuyển dụng",
        href: "/recruitment",
    },
];

export const infomationNavItems: NavType[] = [
    {
        title: "MEDIA",
        href: "/media/hinh-anh",
        children: [
            {
                title: "Hình ảnh",
                href: "/media/hinh-anh",
            },
            {
                title: "Video",
                href: "/media/video",
            },
            {
                title: "E-Brochure",
                href: "/media/e-brochure",
            },
        ],
    },
    {
        title: "Tin tức",
        href: "/category/news",
        tabs: [
            {
                title: "Sự kiện",
                href: "/category/event",
            },
            {
                title: "Khuyến mãi",
                href: "/category/sale",
            },
            {
                title: "Blog Khỏe và đẹp",
                href: "/category/blog",
            },
        ],
    },
    {
        title: "LIÊN HỆ",
        href: "/contact",
    },
];
