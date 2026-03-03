import { Skeleton } from "@/components/ui/skeleton";
import navNameMap from "@/layouts/public/PublicHeader/components/Navbar/data";
import NavItem from "@/layouts/public/PublicHeader/components/NavItem/NavItem";
import { mediaCategoryService } from "@/services/mediaCategoryService";
import { navService } from "@/services/navService";
import { postCategoryService } from "@/services/postCategoryService";
import { productCategoryService } from "@/services/productCategoryService";
import { serviceCategoryService } from "@/services/serviceCategoryService";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
function Navbar({ onClick }: { onClick?: () => void }) {
    const [navs, setNavs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const locale = useLocale();

    const fetchNavs = async () => {
        try {
            const allowedCodes = [
                "introduce",
                "services",
                "product",
                "recruitment",
            ];

            const orderMap: Record<string, number> = {
                introduce: 0,
                services: 1,
                product: 2,
                recruitment: 3,
            };

            const [
                navRes,
                serviceCateRes,
                productCateRes,
                postCateRes,
                mediaCateRes,
            ] = await Promise.all([
                navService.getAll(),
                serviceCategoryService.list({
                    isActive: true,
                    lang: locale,
                }),
                productCategoryService.list({
                    isActive: true,
                    lang: locale,
                }),
                postCategoryService.list({
                    isActive: true,
                    lang: locale,
                }),
                mediaCategoryService.list({
                    isActive: true,
                    lang: locale,
                }),
            ]);

            const serviceCategories = serviceCateRes.items;
            const productCategories = productCateRes.items;
            const postCategories = postCateRes.items;
            const mediaCategories = mediaCateRes.items;

            const finalNavs = navRes
                .filter(
                    (item: any) =>
                        allowedCodes.includes(item.code) &&
                        item.status === "active",
                )
                .map((nav: any) => ({
                    ...nav,
                    name: navNameMap[locale]?.[nav.code] || nav.name,
                    children:
                        nav.code === "services"
                            ? serviceCategories
                            : nav.code === "product"
                              ? productCategories
                              : nav.code === "news"
                                ? postCategories
                                : nav.code === "media"
                                  ? mediaCategories
                                  : null,
                }))
                .sort((a: any, b: any) => orderMap[a.code] - orderMap[b.code]);

            setNavs(finalNavs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNavs();
    }, [locale]);

    if (loading)
        return (
            <div className="flex flex-col gap-4">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
            </div>
        );

    return (
        <ul className="flex flex-col items-end gap-0 lg:flex-row lg:items-center lg:gap-2 xl:gap-5">
            {navs.map((navItem) => {
                const needSlug = [
                    "product",
                    "services",
                    "post",
                    "media",
                ].includes(navItem.code);

                const href =
                    needSlug && navItem.children?.length
                        ? `/${navItem.code}/${navItem.children[0].slug}`
                        : `/${navItem.code}`;

                return (
                    <NavItem
                        key={navItem.id}
                        title={navItem.name || ""}
                        href={href}
                        code={navItem.code}
                        childNavs={navItem.children}
                        onClick={onClick}
                    />
                );
            })}
        </ul>
    );
}

export default Navbar;
