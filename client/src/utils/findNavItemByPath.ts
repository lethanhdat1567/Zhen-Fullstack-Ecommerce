import { NavType } from "@/layouts/public/PublicHeader/data";

export function findNavItemByPath(
    navItems: NavType[],
    pathname: string,
): NavType | undefined {
    let matched: NavType | undefined;

    for (const item of navItems) {
        if (pathname === item.href || pathname.startsWith(item.href + "/")) {
            if (!matched || item.href.length > matched.href.length) {
                matched = item;
            }
        }

        // gom children + tabs
        const subItems = [...(item.children || []), ...(item.tabs || [])];

        if (subItems.length) {
            const childMatch = findNavItemByPath(subItems, pathname);

            if (
                childMatch &&
                (!matched || childMatch.href.length > matched.href.length)
            ) {
                matched = childMatch;
            }
        }
    }

    return matched;
}
