import { Link, usePathname } from "@/i18n/navigation";
import { House } from "lucide-react";

function HomeBtn() {
    const pathname = usePathname();

    return (
        <button
            className={`relative mb-6 cursor-pointer hover:text-(--primary-color) lg:mb-0 ${pathname === "/" ? "text-(--primary-color) after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-(--primary-color)" : ""}`}
        >
            <Link href={"/"}>
                <House size={20} />
            </Link>
        </button>
    );
}

export default HomeBtn;
