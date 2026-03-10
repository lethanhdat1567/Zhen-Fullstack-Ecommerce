"use client";

import { useDebounce } from "@/hooks/use-debounce";
import SearchDropdownSection from "@/layouts/public/PublicHeader/components/SearchSection/components/SearchDropdownSection/SearchDropdownSection";
import SearchInput from "@/layouts/public/PublicHeader/components/SearchSection/components/SearchInput/SearchBtn";
import { checkShowDropdown } from "@/layouts/public/PublicHeader/components/SearchSection/helpers";
import { searchService, SearchSuggestResult } from "@/services/searchService";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

function SearchSection() {
    const [searchValue, setSearchValue] = useState("");
    const [searchData, setSearchData] = useState<SearchSuggestResult>({
        products: [],
        services: [],
        posts: [],
    });
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

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
        setLoading(true);
        try {
            const res = await searchService.suggest({
                lang: locale,
                q: searchDebounce,
            });

            setSearchData(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSearchData();
    }, [searchDebounce]);

    useEffect(() => {
        setShowDropdown(Boolean(checkShowDropdown(searchData) && searchValue));
    }, [searchData, searchValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-100">
            <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                loading={loading}
                onFocus={() => {
                    setShowDropdown(
                        Boolean(checkShowDropdown(searchData) && searchValue),
                    );
                }}
                onClear={() => {
                    setSearchValue("");
                }}
            />

            <div
                className={`absolute right-0 -bottom-2 left-0 z-50 max-h-100 translate-y-full overflow-y-auto rounded-sm border bg-white p-3 text-black shadow transition-all duration-200 ${showDropdown ? "visible translate-y-full opacity-100" : "pointer-events-none invisible translate-y-[110%] overscroll-contain opacity-0"}`}
                data-lenis-prevent
            >
                <SearchDropdownSection
                    data={searchData}
                    searchValue={searchValue}
                    onClose={() => {
                        setShowDropdown(false);
                        setSearchValue("");
                    }}
                />
            </div>
        </div>
    );
}

export default SearchSection;
