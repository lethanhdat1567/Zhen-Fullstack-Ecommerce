"use client";

import { usePathname } from "@/i18n/navigation";
import {
    mainNavItems,
    infomationNavItems,
    NavType,
} from "@/layouts/public/PublicHeader/data";
import { findNavItemByPath } from "@/utils/findNavItemByPath";

export function useAutoNav() {
    const pathname = usePathname();

    const allNav = [...mainNavItems, ...infomationNavItems];
    const matchedNav = findNavItemByPath(allNav, pathname);

    let childNav: NavType | undefined;

    if (matchedNav) {
        const subItems = [
            ...(matchedNav.children || []),
            ...(matchedNav.tabs || []),
        ];

        childNav = subItems.find(
            (item) =>
                pathname === item.href || pathname.startsWith(item.href + "/"),
        );
    }

    return {
        pathname,
        matchedNav,
        childNav,
    };
}
