import { Service } from "@/app/[locale]/(public)/(header-bg)/search/page";
import { resolveMediaSrc } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
    service: Service;
};

function ServiceCard({ service }: Props) {
    return (
        <Link
            href={`/services/${service.id}`}
            className="group flex gap-4 rounded-lg border p-3 transition hover:shadow-sm"
        >
            {/* Thumbnail */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
                <Image
                    src={resolveMediaSrc(service.thumbnail)}
                    alt={service.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="group-hover:text-primary line-clamp-1 text-sm font-semibold">
                        {service.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {service.description}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Sức chứa: {service.capacity} người
                    </p>
                </div>

                <span className="mt-2 text-base font-semibold text-green-600">
                    {service.sale_price || service.price}
                </span>
            </div>
        </Link>
    );
}

export default ServiceCard;
