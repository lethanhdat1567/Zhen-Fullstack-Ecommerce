import { SearchSuggestResult } from "@/services/searchService";
import SearchDropdownItem from "@/layouts/public/PublicHeader/components/SearchSection/components/SearchDropdownSection/SearchDropdownItem";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
    data: SearchSuggestResult;
    searchValue: string;
    onClose: () => void;
};

function SearchDropdownSection({ data, searchValue, onClose }: Props) {
    const t = useTranslations("Header.search");

    const sections = [
        {
            key: "services",
            title: t("type.service"),
            tab: "service",
        },
        {
            key: "products",
            title: t("type.product"),
            tab: "product",
        },
        {
            key: "posts",
            title: t("type.news"),
            tab: "post",
        },
    ] as const;

    return (
        <div className="space-y-4">
            {sections.map((section) => {
                const items = data[section.key];

                if (!items.length) return null;

                return (
                    <div key={section.key}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                                {section.title}
                            </h3>

                            <Link
                                href={`/search?tab=${section.tab}&q=${searchValue}`}
                                className="text-xs font-medium hover:text-green-800 hover:underline"
                                onClick={onClose}
                            >
                                {t("more")}
                            </Link>
                        </div>

                        <div className="mt-2 space-y-2">
                            {items.map((item) => (
                                <SearchDropdownItem item={item} key={item.id} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SearchDropdownSection;
