"use client";

import Logo from "@/components/Logo/Logo";
import { Separator } from "@/components/ui/separator";
import CartHeader from "@/layouts/public/PublicHeader/components/CartHeader/CartHeader";
import LanguageSwitcher from "@/layouts/public/PublicHeader/components/LanguageSwitcher/LanguageSwitcher";
import LikeBtn from "@/layouts/public/PublicHeader/components/LikeBtn/LikeBtn";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import PhoneSection from "@/layouts/public/PublicHeader/components/PhoneSection/PhoneSection";
import SearchSection from "@/layouts/public/PublicHeader/components/SearchSection/SearchSection";
import Sidebar from "@/layouts/public/PublicHeader/components/Sidebar/Sidebar";
import UserSection from "@/layouts/public/PublicHeader/components/UserSection/UserSection";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

function PublicHeader({ isSingle }: { isSingle?: boolean }) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        // Nếu isSingle thì không chạy logic tính toán scroll nữa
        if (isSingle) return;

        const previous = scrollY.getPrevious() ?? 0;
        if (current > previous && current > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            // Khi isSingle: dùng static, ngược lại dùng fixed
            className={`fixed top-0 z-999 w-full bg-white`}
            // Khi isSingle: xóa bỏ animate
            animate={
                isSingle
                    ? { y: 0, opacity: 1 }
                    : {
                          y: hidden ? -140 : 0,
                          opacity: hidden ? 0 : 1,
                      }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="bg-[#1c5b41] text-white">
                <div className="px-4 sm:px-10 xl:px-40">
                    <div className="flex items-center justify-between gap-10 py-4 lg:gap-10">
                        <Logo />
                        <div className="hidden w-100 sm:block">
                            <SearchSection />
                        </div>
                        <div className="flex flex-row items-center gap-2 sm:flex-row-reverse sm:gap-4 lg:flex-row">
                            <UserSection />
                            <LikeBtn />
                            <CartHeader />
                            <div className="hidden sm:block">
                                <LanguageSwitcher />
                            </div>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            {!isSingle && (
                <div className="bg-[#FFFAF0]">
                    <div className="hidden px-10 sm:block xl:px-30">
                        <div className="flex items-center py-4">
                            <div className="flex-1">
                                <Navbar />
                            </div>
                            <Separator
                                className="mr-5 hidden h-6! lg:block"
                                orientation="vertical"
                            />
                            <PhoneSection />
                        </div>
                    </div>
                    <div className="flex h-16 items-center px-4 sm:hidden sm:px-10">
                        <SearchSection />
                    </div>
                </div>
            )}
        </motion.header>
    );
}

export default PublicHeader;
