import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchInput from "@/components/Auto/components/FilterBtn/components/SearchInput/SearchInput";
import { TextSearch } from "lucide-react";
import PriceRange from "@/components/Auto/components/FilterBtn/components/PriceRange/PriceRange";
import SortRadio from "@/components/Auto/components/FilterBtn/components/SortRadio/SortRadio";
import { Separator } from "@/components/ui/separator";

function FilterBtn() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2">
                    <TextSearch size={18} />
                    <span className="inline">Tìm kiếm và chọn lọc</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[calc(100vw-2rem)] space-y-4 p-4 sm:w-80 md:w-md"
                align="end"
                sideOffset={8}
            >
                <div className="space-y-4">
                    <SearchInput />
                    <Separator />
                    <PriceRange />
                    <Separator />
                    <SortRadio />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default FilterBtn;
