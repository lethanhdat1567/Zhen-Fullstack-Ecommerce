import { images } from "@/assets/images";
import { Link } from "@/i18n/navigation";
import { resolveMediaSrc } from "@/lib/image";
import { siteSettingService } from "@/services/siteService";
import { Globe, Mail, Map, Phone } from "lucide-react";
import Image from "next/image";

async function Info() {
    const res = await siteSettingService.get();

    return (
        <div className="h-full bg-(--primary-color) py-12 md:py-16 lg:py-20">
            <div className="px-6 md:px-10 lg:px-20">
                {/* Logo */}
                <div className="mb-6 w-32 md:w-40">
                    <Image
                        src={resolveMediaSrc(res.logo)}
                        width={300}
                        height={300}
                        alt="Logo"
                        className="h-auto w-full brightness-0 invert"
                    />
                </div>

                {/* Company Name */}
                <h3 className="mb-6 text-xl leading-snug text-white md:text-2xl lg:text-[30px]">
                    Công ty TNHH <br /> Dịch Vụ Sen Spa
                </h3>

                {/* Info List */}
                <div className="mb-10 space-y-6 text-white">
                    {/* Address */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex min-w-[120px] items-center">
                            <Map className="mr-2 text-gray-300" size={18} />
                            <h4 className="text-sm">Địa chỉ:</h4>
                        </div>
                        <p className="text-sm break-words">{res.address}</p>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex min-w-[120px] items-center">
                            <Phone className="mr-2 text-gray-300" size={18} />
                            <h4 className="text-sm">Điện thoại:</h4>
                        </div>
                        <p className="text-sm">{res.phone_number}</p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex min-w-[120px] items-center">
                            <Mail className="mr-2 text-gray-300" size={18} />
                            <h4 className="text-sm">Email:</h4>
                        </div>
                        <p className="text-sm break-words">{res.email}</p>
                    </div>

                    {/* Website */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex min-w-[120px] items-center">
                            <Globe className="mr-2 text-gray-300" size={18} />
                            <h4 className="text-sm">Website:</h4>
                        </div>
                        <p className="text-sm break-words">localhost:8000</p>
                    </div>
                </div>

                {/* Social */}
                <ul className="flex gap-4">
                    {res.facebook_url && (
                        <li>
                            <Link href={res.facebook_url} target="_blank">
                                <Image
                                    src={images.facebook}
                                    width={23}
                                    height={22}
                                    alt="Facebook"
                                />
                            </Link>
                        </li>
                    )}

                    {res.instagram_url && (
                        <li>
                            <Link href={res.instagram_url} target="_blank">
                                <Image
                                    src={images.twitter}
                                    width={23}
                                    height={22}
                                    alt="Instagram"
                                />
                            </Link>
                        </li>
                    )}

                    {res.youtube_url && (
                        <li>
                            <Link href={res.youtube_url} target="_blank">
                                <Image
                                    src={images.youtube}
                                    width={23}
                                    height={22}
                                    alt="YouTube"
                                />
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Info;
