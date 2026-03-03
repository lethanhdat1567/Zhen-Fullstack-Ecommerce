"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo/Logo";
import HomeBtn from "@/layouts/public/PublicHeader/components/HomeBtn/HomeBtn";
import LanguageSwitcher from "@/layouts/public/PublicHeader/components/LanguageSwitcher/LanguageSwitcher";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import NavInfomation from "@/layouts/public/PublicHeader/components/NavInfomation/NavInfomation";
import PhoneSection from "@/layouts/public/PublicHeader/components/PhoneSection/PhoneSection";
import Sidebar from "@/layouts/public/PublicHeader/components/Sidebar/Sidebar";

function PublicHeader({ isBg = false }: { isBg?: boolean }) {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const isMobile = window.innerWidth < 1024;

            if (isMobile) {
                setIsTop(false);
            } else {
                setIsTop(window.scrollY === 0);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const isWhiteBg = !isTop || isBg;

    return (
        <div
            className={`fixed top-0 right-0 left-0 z-50 flex w-screen items-center justify-between px-10 transition-[height,background-color,color] duration-500 lg:px-10 xl:px-18 ${
                isWhiteBg
                    ? "bg-white text-(--text-color)"
                    : "bg-transparent text-white"
            } ${
                isTop
                    ? "h-[calc(var(--header-height)+20px)]"
                    : "h-(--header-height)"
            }`}
        >
            <div className="hidden items-center gap-2 lg:flex xl:gap-5">
                <HomeBtn />
                <Navbar />
            </div>

            <Logo isScale={isTop} />

            <div className="flex items-center gap-5 xl:gap-5">
                <div className="hidden lg:block">
                    <NavInfomation />
                </div>
                <PhoneSection />
                <LanguageSwitcher />
                <Sidebar />
            </div>
        </div>
    );
}

export default PublicHeader;
