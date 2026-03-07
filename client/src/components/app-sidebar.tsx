"use client";

import * as React from "react";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    ShoppingCart,
    FileText,
    Image as ImageIcon,
    Mail,
    LayoutTemplate,
    Settings,
    GalleryVerticalEnd,
    AudioWaveform,
    Command,
    BriefcaseBusiness,
    ShoppingBag,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/assets/images";
import { siteSettingService } from "@/services/siteService";
import { resolveMediaSrc } from "@/lib/image";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Trang chủ",
            url: "#",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Thống kê",
                    url: "/admin/dashboard",
                },
            ],
        },
        {
            title: "Quản lý tài khoản",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Danh sách tài khoản",
                    url: "/admin/users",
                },
            ],
        },
        {
            title: "Quản lý đơn hàng",
            url: "#",
            icon: ShoppingBag,
            items: [
                {
                    title: "Danh sách đơn hàng",
                    url: "/admin/orders",
                },
            ],
        },
        {
            title: "Quản lý đặt phòng",
            url: "#",
            icon: ShoppingBag,
            items: [
                {
                    title: "Danh sách đặt phòng",
                    url: "/admin/bookings",
                },
                {
                    title: "Danh sách khóa phòng",
                    url: "/admin/bookings/block",
                },
            ],
        },
        {
            title: "Quản lý dịch vụ",
            url: "#",
            icon: Briefcase,
            items: [
                { title: "Quản lý danh mục", url: "/admin/services/category" },
                { title: "Quản lý dịch vụ", url: "/admin/services" },
            ],
        },
        {
            title: "Quản lý sản phẩm",
            url: "#",
            icon: ShoppingCart,
            items: [
                { title: "Quản lý danh mục", url: "/admin/products/category" },
                { title: "Quản lý sản phẩm", url: "/admin/products" },
            ],
        },
        {
            title: "Quản lý bài viết",
            url: "#",
            icon: FileText,
            items: [
                { title: "Quản lý danh mục", url: "/admin/posts/category" },
                { title: "Quản lý bài viết", url: "/admin/posts" },
            ],
        },
        {
            title: "Quản lý media",
            url: "#",
            icon: ImageIcon,
            items: [
                {
                    title: "Quản lí thể loại media",
                    url: "/admin/media/category",
                },
                { title: "Quản lí albums", url: "/admin/media/albums" },
            ],
        },
        {
            title: "Quản lý liên hệ",
            url: "#",
            icon: Mail,
            items: [
                {
                    title: "Danh sách liên hệ",
                    url: "/admin/contacts",
                },
            ],
        },
        {
            title: "Quản lí tuyển dụng",
            url: "#",
            icon: BriefcaseBusiness,
            items: [
                {
                    title: "Danh sách tuyển dụng",
                    url: "/admin/recruitment",
                },
            ],
        },
        {
            title: "Quản lý modal",
            url: "#",
            icon: LayoutTemplate,
            items: [
                {
                    title: "Danh sách modal",
                    url: "/admin/modals",
                },
            ],
        },
        {
            title: "Cài đặt hệ thống",
            url: "#",
            icon: Settings,
            items: [
                { title: "Quản lý giao diện", url: "/admin/settings/general" },
                { title: "Thông tin công ty", url: "/admin/settings/company" },
            ],
        },
    ],

    projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [logo, setLogo] = React.useState("");

    const fetchLogo = async () => {
        const { logo } = await siteSettingService.get();
        setLogo(logo || "");
    };

    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLogo();
    }, []);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Link
                    href={"/admin/dashboard"}
                    className="flex max-h-20 w-full items-center justify-center"
                >
                    <Image
                        src={resolveMediaSrc(logo)}
                        alt="logo"
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                    />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
