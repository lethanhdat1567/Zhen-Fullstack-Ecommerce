"use client";

import Logo from "@/components/Logo/Logo";
import { Separator } from "@/components/ui/separator";
import CartHeader from "@/layouts/public/PublicHeader/components/CartHeader/CartHeader";
import LanguageSwitcher from "@/layouts/public/PublicHeader/components/LanguageSwitcher/LanguageSwitcher";
import LikeBtn from "@/layouts/public/PublicHeader/components/LikeBtn/LikeBtn";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import PhoneSection from "@/layouts/public/PublicHeader/components/PhoneSection/PhoneSection";
import SearchSection from "@/layouts/public/PublicHeader/components/SearchSection/SearchSection";
import UserSection from "@/layouts/public/PublicHeader/components/UserSection/UserSection";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

function PublicHeader() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (current > previous && current > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });
    return (
        <motion.header
            className="fixed top-0 z-999 w-full bg-white"
            animate={{
                y: hidden ? -140 : 0,
                opacity: hidden ? 0 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="bg-[#1c5b41] text-white">
                <div className="container">
                    <div className="flex items-center justify-between py-4">
                        <Logo />
                        <SearchSection />
                        <div className="flex items-center gap-4">
                            <UserSection />
                            <LikeBtn />
                            <CartHeader />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#FFFAF0]">
                <div className="px-30">
                    <div className="flex items-center py-4">
                        <div className="flex-1">
                            <Navbar />
                        </div>
                        <Separator
                            className="mr-5 h-6!"
                            orientation="vertical"
                        />
                        <PhoneSection />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}

export default PublicHeader;
