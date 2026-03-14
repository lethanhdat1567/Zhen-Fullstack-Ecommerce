"use client";

import { images } from "@/assets/images";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();
    const locale = useLocale();

    const switchLocale = (nextLocale: string) => {
        if (locale === nextLocale) return;

        router.push(`/${nextLocale}`);
    };

    const languages = [
        { code: "vi", flag: images.VNFlat },
        { code: "en", flag: images.USAFlat },
        { code: "fr", flag: images.FRFlat },
    ];

    return (
        <div className="flex gap-4 lg:gap-2">
            {languages
                .filter((lang) => lang.code !== locale)
                .map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => switchLocale(lang.code)}
                        className="h-[15px] w-[24px] cursor-pointer transition-transform duration-300 hover:scale-110"
                    >
                        <Image
                            src={lang.flag}
                            alt={lang.code}
                            width={24}
                            height={24}
                            className="h-auto w-8 object-cover lg:w-6"
                        />
                    </button>
                ))}
        </div>
    );
}
