"use client";

import NavItem from "@/layouts/public/PublicHeader/components/NavItem/NavItem";
import { navService } from "@/services/navService";
import { mediaCategoryService } from "@/services/mediaCategoryService";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { postCategoryService } from "@/services/postCategoryService";
import navNameMap from "@/layouts/public/PublicHeader/components/NavInfomation/data";
import { Skeleton } from "@/components/ui/skeleton";

function NavInfomation({ onClick }: { onClick?: () => void }) {
    const [navs, setNavs] = useState<any[]>([]);
    const locale = useLocale();
    const [loading, setLoading] = useState(true);

    const fetchNavs = async () => {
        try {
            const orderMap: Record<string, number> = {
                media: 0,
                news: 1,
                contact: 2,
            };

            const [navRes, mediaCateRes, newsCateRes] = await Promise.all([
                navService.getAll(),
                mediaCategoryService.list({
                    isActive: true,
                    lang: locale,
                }),
                postCategoryService.list({
                    isActive: true,
                    lang: locale,
                }),
            ]);

            const categoryMap: Record<string, any[]> = {
                media: mediaCateRes.items,
                news: newsCateRes.items,
            };

            const finalNavs = navRes
                .filter(
                    (item: any) =>
                        item.status === "active" &&
                        orderMap[item.code] !== undefined,
                )
                .map((nav: any) => ({
                    ...nav,
                    // override name theo locale
                    name: navNameMap[locale]?.[nav.code] || nav.name,
                    children: categoryMap[nav.code] || null,
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
            <div className="mt-4 flex flex-col gap-4 lg:mt-0">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
            </div>
        );

    return (
        <ul className="flex flex-col items-end lg:flex-row lg:items-center lg:gap-2 xl:gap-5">
            {navs.map((navItem) => {
                const needSlug =
                    navItem.code === "media" || navItem.code === "news";

                const href =
                    needSlug && navItem.children?.[0]?.slug
                        ? `/${navItem.code}/${navItem.children[0].slug}`
                        : `/${navItem.code}`;

                return (
                    <NavItem
                        key={navItem.id}
                        title={navItem.name}
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

export default NavInfomation;
