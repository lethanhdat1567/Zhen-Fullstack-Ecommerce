"use client";

import { SearchIcon } from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
    const [searchValue, setSearchValue] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSearch() {
        const params = new URLSearchParams(searchParams.toString());

        if (searchValue.trim()) {
            params.set("search", searchValue);
        } else {
            params.delete("search");
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    // 🔹 Sync state với URL params
    useEffect(() => {
        const urlSearch = searchParams.get("search") || "";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchValue(urlSearch);
    }, [searchParams]);

    return (
        <div>
            <p className="mb-2 text-sm font-medium">Tìm kiếm:</p>

            <div className="flex items-center gap-2">
                <InputGroup>
                    <InputGroupInput
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                    />

                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>

                    <InputGroupAddon align="inline-end">
                        <Kbd>Enter</Kbd>
                    </InputGroupAddon>
                </InputGroup>

                <Button className="rounded-sm" onClick={handleSearch}>
                    Search
                </Button>
            </div>
        </div>
    );
}

export default SearchInput;
