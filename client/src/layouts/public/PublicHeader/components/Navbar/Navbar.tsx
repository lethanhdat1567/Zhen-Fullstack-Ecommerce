"use client";

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
            // 1. Bổ sung các mã code mới vào danh sách cho phép
            const allowedCodes = [
                "home", // Thêm home nếu bạn muốn hiển thị
                "introduce",
                "service",
                "product",
                "news", // Mới bổ sung
                "media", // Mới bổ sung
                "recruitment",
                "contact", // Mới bổ sung
                "track-order",
            ];

            // 2. Sắp xếp lại thứ tự hiển thị cho hợp lý
            const orderMap: Record<string, number> = {
                home: 0,
                introduce: 1,
                service: 2,
                product: 3,
                news: 4,
                media: 5,
                recruitment: 6,
                contact: 7,
                "track-order": 8,
            };

            const [
                navRes,
                serviceCateRes,
                productCateRes,
                postCateRes,
                mediaCateRes,
            ] = await Promise.all([
                navService.getAll(),
                serviceCategoryService.list({ isActive: true, lang: locale }),
                productCategoryService.list({ isActive: true, lang: locale }),
                postCategoryService.list({ isActive: true, lang: locale }),
                mediaCategoryService.list({ isActive: true, lang: locale }),
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
                        nav.code === "service"
                            ? serviceCategories
                            : nav.code === "product"
                              ? productCategories
                              : nav.code === "news" // Logic mapping cho News
                                ? postCategories
                                : nav.code === "media" // Logic mapping cho Media
                                  ? mediaCategories
                                  : null,
                }))
                // Sắp xếp dựa trên orderMap đã định nghĩa
                .sort(
                    (a: any, b: any) =>
                        (orderMap[a.code] ?? 99) - (orderMap[b.code] ?? 99),
                );

            setNavs(finalNavs);
        } catch (error) {
            console.error("Fetch Navs Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNavs();
    }, [locale]);

    if (loading)
        return (
            <div className="mr-4 flex flex-col gap-4">
                <Skeleton className="h-8 w-full" />
            </div>
        );

    return (
        <ul className="flex flex-col items-end gap-0 lg:flex-row lg:items-center lg:gap-2 xl:gap-5">
            {navs.map((navItem) => {
                // Kiểm tra xem code có cần lấy slug của thằng con đầu tiên không
                const needSlug = [
                    "product",
                    "service",
                    "news",
                    "media",
                ].includes(navItem.code);

                // Tạo đường dẫn href
                const href =
                    needSlug && navItem.children?.length
                        ? `/${navItem.code}/${navItem.children[0].slug}`
                        : navItem.code === "home"
                          ? "/"
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
