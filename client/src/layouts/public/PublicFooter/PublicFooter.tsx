import { images } from "@/assets/images";
import Image from "next/image";
import FooterBrand from "./components/FooterBrand/FooterBrand";
import FooterCompanyInfo from "./components/FooterCompanyInfo/FooterCompanyInfo";
import FooterQuickLinks from "./components/FooterQuickLinks/FooterQuickLinks";
import { siteSettingService } from "@/services/siteService";
import { getTranslations } from "next-intl/server";

async function PublicFooter() {
    const getSiteInfo = await siteSettingService.get();
    const t = await getTranslations("Footer");

    return (
        <footer className="text-white">
            {/* Content */}
            <div className="relative w-full overflow-hidden">
                <Image
                    src={images.bg_footer}
                    alt="footer background"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="relative z-10 container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    {/* Grid */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <FooterBrand footer={getSiteInfo} />
                        <FooterCompanyInfo footer={getSiteInfo} />
                        <FooterQuickLinks />
                    </div>

                    {/* Note section */}
                    <div className="mt-10 text-center text-sm text-(--primary-color) italic md:text-base lg:mt-14">
                        <p className="mb-4">{t("vat")}</p>
                        <p>{t("desc")}</p>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-center bg-(--primary-color) py-4 text-center text-xs sm:text-sm">
                <p className="opacity-60">{t("copyright")}</p>
            </div>
        </footer>
    );
}

export default PublicFooter;
