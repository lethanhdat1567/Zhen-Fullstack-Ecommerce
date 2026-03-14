import { Link, usePathname } from "@/i18n/navigation";
import NavDropdownMobile from "@/layouts/public/PublicHeader/components/NavItem/components/NavDropdownMobile/NavDropdownMobile";
import NavItemDropdown from "@/layouts/public/PublicHeader/components/NavItem/components/NavItemDropdown/NavItemDropdown";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
    title: string;
    href: string;
    code: string;
    childNavs?: {
        name: string;
        slug: string;
    }[];
    onClick?: () => void;
};

function NavItem({ title, href, code, childNavs, onClick }: Props) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const [isShowDropdown, setIsShowDropdown] = useState(false);

    return (
        <li
            className={`${pathname === href ? "font-medium text-(--primary-color)" : ""} group/nav text-md relative flex w-full cursor-pointer flex-col items-center justify-between gap-2 py-2 text-neutral-600 transition hover:text-(--primary-color) sm:w-auto sm:py-0 sm:text-sm lg:py-0`}
        >
            <div
                className={`relative flex w-full items-center justify-between gap-2 ${
                    isActive
                        ? "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-(--primary-color) after:content-['']"
                        : ""
                }`}
            >
                <Link
                    href={href}
                    className={`w-full uppercase transition hover:text-(--primary-color) ${
                        isActive ? "font-medium text-(--primary-color)" : ""
                    }`}
                    onClick={onClick}
                >
                    {title}
                </Link>

                {childNavs && (
                    <span className="flex h-8 w-8 items-center justify-center sm:h-2 sm:w-2">
                        <ChevronDown
                            size={20}
                            onClick={() => setIsShowDropdown(!isShowDropdown)}
                            className={`cursor-pointer transition-transform duration-300 ${
                                isShowDropdown ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </span>
                )}
            </div>
            {/* Dropdown */}
            {childNavs && (
                <>
                    <NavItemDropdown navChildren={childNavs} navCode={code} />
                    <NavDropdownMobile
                        navs={childNavs}
                        onClick={() => onClick && onClick()}
                        isActive={isShowDropdown}
                        code={code}
                    />
                </>
            )}
        </li>
    );
}

export default NavItem;
