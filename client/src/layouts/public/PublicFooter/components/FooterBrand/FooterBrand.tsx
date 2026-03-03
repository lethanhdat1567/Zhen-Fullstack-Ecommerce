import { images } from "@/assets/images";
import { Link } from "@/i18n/navigation";
import { resolveMediaSrc } from "@/lib/image";
import { SiteSetting } from "@/services/siteService";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/assets/icons";

interface IProps {
    footer: SiteSetting;
}

function FooterBrand({ footer }: IProps) {
    return (
        <div className="flex flex-col items-start text-left lg:items-center lg:text-center">
            {/* Logo */}
            {footer.logo && (
                <Image
                    src={resolveMediaSrc(footer.logo)}
                    alt="logo"
                    width={180}
                    height={70}
                    className="mb-8 h-auto w-auto max-w-[180px]"
                />
            )}

            {/* Lotus */}
            <Image
                src={images.lotus}
                alt="lotus"
                width={116}
                height={25}
                className="mb-8 brightness-0 invert"
            />

            {/* Social */}
            <ul className="flex items-center gap-4">
                {footer.facebook_url && (
                    <li>
                        <Link
                            href={footer.facebook_url}
                            target="_blank"
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-black"
                        >
                            <Facebook
                                size={20}
                                className="transition group-hover:scale-110"
                            />
                        </Link>
                    </li>
                )}

                {footer.instagram_url && (
                    <li>
                        <Link
                            href={footer.instagram_url}
                            target="_blank"
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-black"
                        >
                            <Instagram
                                size={20}
                                className="transition group-hover:scale-110"
                            />
                        </Link>
                    </li>
                )}

                {footer.tiktok_url && (
                    <li>
                        <Link
                            href={footer.tiktok_url}
                            target="_blank"
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-black"
                        >
                            {TikTokIcon}
                        </Link>
                    </li>
                )}

                {footer.youtube_url && (
                    <li>
                        <Link
                            href={footer.youtube_url}
                            target="_blank"
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition hover:bg-white hover:text-black"
                        >
                            <Youtube
                                size={20}
                                className="transition group-hover:scale-110"
                            />
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default FooterBrand;
