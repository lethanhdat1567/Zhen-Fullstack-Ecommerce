import { Link } from "@/i18n/navigation";

type Props = {
    navChildren: {
        name: string;
        slug: string;
    }[];
    navCode: string;
};

function NavItemDropdown({ navChildren, navCode }: Props) {
    return (
        <>
            <div className="absolute right-0 bottom-0 left-0 z-999999 hidden h-5 translate-y-full opacity-0 lg:block" />
            <div className="invisible absolute -bottom-3 left-0 z-999999 hidden min-w-50 translate-y-full flex-col overflow-hidden rounded-tl-2xl rounded-br-2xl bg-white opacity-0 shadow transition group-hover/nav:visible group-hover/nav:opacity-100 lg:flex">
                {navChildren.map((item, index) => (
                    <Link
                        href={`/${navCode}/${item.slug}`}
                        key={index}
                        className="group/nav-item flex items-center gap-2 px-4 py-2 transition hover:bg-(--primary-color) hover:text-white"
                    >
                        <span className="block h-0.5 w-0 bg-white transition-all duration-700 group-hover/nav-item:w-2"></span>
                        {item.name}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default NavItemDropdown;
