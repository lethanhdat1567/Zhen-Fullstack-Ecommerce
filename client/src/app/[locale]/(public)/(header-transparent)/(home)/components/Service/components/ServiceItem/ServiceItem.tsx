import Image from "next/image";
import ServiceOverlay from "./components/ServiceOverlay/ServiceOverlay";
import ServiceDefaultContent from "./components/ServiceDefaultContent/ServiceDefaultContent";
import { resolveMediaSrc } from "@/lib/image";
import { Link } from "@/i18n/navigation";

type Props = {
    title: string;
    desc: string;
    thumbnail: string;
    slug: string;
};

function ServiceItem({ title, desc, thumbnail, slug }: Props) {
    return (
        <>
            <div className="group/service relative z-10 hidden h-100 w-full overflow-hidden rounded-xl lg:block">
                <Image
                    src={resolveMediaSrc(thumbnail)}
                    alt={title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                />

                <ServiceOverlay title={title} desc={desc} />

                <ServiceDefaultContent title={title} />
            </div>

            <Link
                href={`/services/${slug}`}
                className="group/service relative z-10 h-100 w-full overflow-hidden rounded-xl lg:block lg:hidden"
            >
                <Image
                    src={resolveMediaSrc(thumbnail)}
                    alt={title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                />

                <ServiceDefaultContent title={title} />
            </Link>
        </>
    );
}

export default ServiceItem;
