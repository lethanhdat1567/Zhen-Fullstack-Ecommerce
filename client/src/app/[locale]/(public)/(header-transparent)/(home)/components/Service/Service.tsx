import HeaderService from "./components/HeaderService/HeaderService";
import ServiceItem from "./components/ServiceItem/ServiceItem";
import Image from "next/image";
import { images } from "@/assets/images";
import { serviceService } from "@/services/service";
import { getLocale } from "next-intl/server";
import AnimatedContent from "@/components/AnimatedContent";

async function Service() {
    const locale = await getLocale();
    const services = await serviceService.getRelatedServices({
        lang: locale,
        limit: 4,
    });

    return (
        <section className="relative bg-[#f4f1f4] py-12 md:py-16 lg:py-20">
            <div className="relative z-10 container">
                <HeaderService />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
                    {services.map((item, index) => (
                        <AnimatedContent key={index} delay={index / 10}>
                            <ServiceItem
                                title={item.title || ""}
                                thumbnail={item.thumbnail || ""}
                                desc={item.description || ""}
                                slug={item.slug || ""}
                            />
                        </AnimatedContent>
                    ))}
                </div>
            </div>

            <Image
                src={images.bg_decor_ver_lager}
                alt=""
                className="pointer-events-none absolute top-1/2 right-0 z-0 hidden -translate-y-1/2 object-cover opacity-60 lg:block"
                style={{
                    filter: "sepia(1) hue-rotate(90deg) brightness(0.3) saturate(500%)",
                }}
            />
        </section>
    );
}

export default Service;
