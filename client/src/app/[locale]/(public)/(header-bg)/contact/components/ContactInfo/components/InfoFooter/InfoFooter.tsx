import { images } from "@/assets/images";
import { siteSettingService } from "@/services/siteService";
import Image from "next/image";
import { resolveMediaSrc } from "@/lib/image";

async function InfoFooter() {
    const data = await siteSettingService.get();

    return (
        <div className="flex flex-col items-center justify-center bg-[#fcf2fb80] px-4 py-12 md:py-16 lg:py-20">
            {/* Title */}
            <h2 className="text-center text-lg leading-snug font-medium text-(--primary-color) md:text-xl lg:text-[22px]">
                SENVIET SPA QUỐC TẾ <br />
                INTERNATIONAL TERMINAL
            </h2>

            {/* Logo */}
            <Image
                src={data?.logo ? resolveMediaSrc(data.logo) : images.lotus}
                width={116}
                height={25}
                alt="logo"
                className="mt-4 mb-8 h-auto w-24 object-contain md:mb-10 md:w-28"
            />

            {/* Info List */}
            <ul className="space-y-2 text-center text-sm break-words md:space-y-3 md:text-base">
                {data?.address && <li>{data.address}</li>}

                {data?.phone_number && (
                    <li>
                        Tel:{" "}
                        <a
                            href={`tel:${data.phone_number}`}
                            className="font-semibold"
                        >
                            {data.phone_number}
                        </a>
                    </li>
                )}

                <li>
                    Website:{" "}
                    <a
                        href="https://senvietspa.com"
                        target="_blank"
                        className="text-(--primary-color)"
                    >
                        senvietspa.com
                    </a>
                </li>

                {data?.email && (
                    <li>
                        Email:{" "}
                        <a
                            href={`mailto:${data.email}`}
                            className="text-(--primary-color)"
                        >
                            {data.email}
                        </a>
                    </li>
                )}

                {data?.open_time && <li>{data.open_time}</li>}
            </ul>
        </div>
    );
}

export default InfoFooter;
