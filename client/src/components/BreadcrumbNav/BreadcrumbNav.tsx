import { Link } from "@/i18n/navigation";
import { NavType } from "@/layouts/public/PublicHeader/data";
import { ChevronRight } from "lucide-react";

interface IProps {
    slug?: NavType;
    childNav?: NavType;
}

function BreadcrumbNav(props: IProps) {
    const { slug, childNav } = props;

    return (
        <div className="container flex items-center text-[14px] text-[#b3b3b3]">
            <Link href="/">Trang chủ</Link>

            {slug && (
                <>
                    <ChevronRight size={14} />
                    <Link href={slug.href}>{slug.title}</Link>
                </>
            )}

            {childNav && (
                <>
                    <ChevronRight size={14} />
                    <span>{childNav.title}</span>
                </>
            )}
        </div>
    );
}
export default BreadcrumbNav;
