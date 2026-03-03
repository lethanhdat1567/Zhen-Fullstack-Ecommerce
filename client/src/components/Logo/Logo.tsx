"use client";

import { images } from "@/assets/images";
import { resolveMediaSrc } from "@/lib/image";
import { siteSettingService } from "@/services/siteService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    isScale?: boolean;
    href?: string;
};

function Logo({ isScale = false, href = "/" }: Props) {
    const [logo, setLogo] = useState("");

    const fetchLogo = async () => {
        const { logo } = await siteSettingService.get();
        setLogo(logo || "");
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLogo();
    }, []);

    if (!logo) return;

    return (
        <Link href={href} className="block h-18 w-30">
            <Image
                src={resolveMediaSrc(logo)}
                alt="ZHEN"
                width={500}
                height={500}
                className={`h-full w-full object-contain transition duration-700 ${isScale ? "scale-120" : ""}`}
            />
        </Link>
    );
}

export default Logo;
