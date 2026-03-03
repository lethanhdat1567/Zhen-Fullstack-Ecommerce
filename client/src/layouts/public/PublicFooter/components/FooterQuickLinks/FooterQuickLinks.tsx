import { Link } from "@/i18n/navigation";
import { navService } from "@/services/navService";
import { getLocale } from "next-intl/server";

async function FooterQuickLinks() {
    const locale = await getLocale();
    const navs = (await navService.getAll()) || [];

    const order = [
        "home",
        "introduce",
        "services",
        "product",
        "news",
        "media",
        "recruitment",
        "contact",
    ];

    const navNameMap: Record<string, Record<string, string>> = {
        vi: {
            home: "Trang chủ",
            introduce: "Giới thiệu",
            services: "Dịch vụ",
            product: "Sản phẩm",
            news: "Tin tức",
            media: "Media",
            recruitment: "Tuyển dụng",
            contact: "Liên hệ",
        },
        en: {
            home: "Home",
            introduce: "About",
            services: "Services",
            product: "Products",
            news: "News",
            media: "Media",
            recruitment: "Recruitment",
            contact: "Contact",
        },
        fr: {
            home: "Accueil",
            introduce: "Présentation",
            services: "Services",
            product: "Produits",
            news: "Actualités",
            media: "Médias",
            recruitment: "Recrutement",
            contact: "Contact",
        },
    };

    const sortedNavs = navs
        .filter((item: any) => item.status === "active")
        .sort((a: any, b: any) => {
            const indexA = order.indexOf(a.code);
            const indexB = order.indexOf(b.code);

            return (
                (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
            );
        })
        .map((item: any) => ({
            ...item,
            name: navNameMap[locale]?.[item.code] || item.name,
        }));

    return (
        <div className="ml-auto w-full lg:w-2/3">
            <h3 className="mb-6 text-lg font-semibold">
                {locale === "fr"
                    ? "LIENS RAPIDES"
                    : locale === "en"
                      ? "QUICK LINKS"
                      : "LIÊN KẾT NHANH"}
            </h3>

            <ul className="space-y-3 text-sm">
                {sortedNavs.map((item: any) => (
                    <li key={item.id}>
                        <Link
                            href={`/${item.code}`}
                            className="text-white/70 transition hover:text-white hover:underline"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FooterQuickLinks;
