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
                <Button variant={"outline"}>
                    <TextSearch /> Tìm kiếm và chọn lọc
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-md space-y-4 p-4" align="end">
                <SearchInput />
                <Separator />
                <PriceRange />
                <Separator />
                <SortRadio />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default FilterBtn;
