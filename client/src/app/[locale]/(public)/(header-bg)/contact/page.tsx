import { images } from "@/assets/images";
import AutoBanner from "@/components/Auto/AutoBanner";
import Image from "next/image";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import GoogleMap from "./components/ContactInfo/components/GoogleMap/GoogleMap";
import InfoFooter from "@/app/[locale]/(public)/(header-bg)/contact/components/ContactInfo/components/InfoFooter/InfoFooter";
import { getTranslations } from "next-intl/server";

async function ContactPage() {
    const t = await getTranslations("Contact");

    return (
        <>
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Liên hệ",
                        href: "/contact",
                    },
                ]}
            />
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-light text-(--primary-color) sm:text-4xl md:text-5xl lg:text-6xl">
                    {t("title")}
                </h2>

                <Image
                    src={images.lotus}
                    width={116}
                    height={25}
                    alt=""
                    className="mt-3.75 mb-10"
                />
            </div>
            <div className="container mb-20">
                <ContactInfo />
            </div>
            <GoogleMap />

            <InfoFooter />
        </>
    );
}

export default ContactPage;
