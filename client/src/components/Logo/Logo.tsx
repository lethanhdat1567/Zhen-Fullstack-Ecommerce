"use client";

import { images } from "@/assets/images";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveMediaSrc } from "@/lib/image";
import { siteSettingService } from "@/services/siteService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    href?: string;
};

function Logo({ href = "/" }: Props) {
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState("");

    const fetchLogo = async () => {
        try {
            const { logo } = await siteSettingService.get();
            setLogo(logo || "");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLogo();
    }, []);

    if (loading)
        return (
            <div>
                <Skeleton className="h-12 w-20" />
            </div>
        );

    return (
        <Link href={href} className="block h-12 w-20">
            <Image
                src={resolveMediaSrc(logo)}
                alt="ZHEN"
                width={500}
                height={500}
                className={`h-full w-full object-contain transition duration-700`}
            />
        </Link>
    );
}

export default Logo;
