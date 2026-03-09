"use client";

import { useDebounce } from "@/hooks/use-debounce";
import SearchDropdownSection from "@/layouts/public/PublicHeader/components/SearchSection/components/SearchDropdownSection/SearchDropdownSection";
import SearchInput from "@/layouts/public/PublicHeader/components/SearchSection/components/SearchInput/SearchBtn";
import { searchService, SearchSuggestResult } from "@/services/searchService";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

function SearchSection() {
    const [searchValue, setSearchValue] = useState("");

    const [searchData, setSearchData] = useState<SearchSuggestResult>({
        products: [],
        services: [],
        posts: [],
    });

    const locale = useLocale();
    const searchDebounce = useDebounce(searchValue, 300);

    const fetchSearchData = async () => {
        if (!searchDebounce.trim()) {
            setSearchData({
                products: [],
                services: [],
                posts: [],
            });
            return;
        }

        try {
            const res = await searchService.suggest({
                lang: locale,
                q: searchDebounce,
            });

            setSearchData(res); //
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSearchData();
    }, [searchDebounce]);

    const hasData =
        searchData.products.length ||
        searchData.services.length ||
        searchData.posts.length;

    return (
        <div className="relative w-100">
            <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            {searchDebounce && hasData ? (
                <div
                    className="absolute right-0 -bottom-2 left-0 z-50 max-h-100 translate-y-full overflow-y-auto rounded-sm border bg-white p-3 text-black shadow"
                    data-lenis-prevent
                >
                    <SearchDropdownSection data={searchData} />
                    <div className="mt-2 flex cursor-pointer items-center justify-center gap-2 border-t p-2 text-sm text-neutral-600 hover:bg-neutral-100">
                        Tìm kiếm thêm <Search size={16} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default SearchSection;
