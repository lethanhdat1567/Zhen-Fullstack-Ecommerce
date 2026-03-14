import { Link } from "@/i18n/navigation";

type Props = {
    navs: {
        name: string;
        slug: string;
    }[];
    onClick: () => void;
    isActive: boolean;
    code: string;
};

function NavDropdownMobile({ navs, onClick, isActive, code }: Props) {
    return (
        <ul
            className={`${isActive ? "block h-auto" : "hidden h-0"} ml-10 w-full text-[16px] font-normal`}
        >
            {navs.map((nav, index) => (
                <li key={index}>
                    <Link
                        className="text-md block w-full py-3"
                        href={`/${code}/${nav.slug}`}
                        onClick={onClick}
                    >
                        {nav.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default NavDropdownMobile;
