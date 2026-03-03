import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";

function DataTableFilter({
    value,
    onChange,
}: {
    value: string | undefined;
    onChange: (value: string) => void;
}) {
    const [searchValue, setSearchValue] = useState(value || "");
    const debouceValue = useDebounce(searchValue, 300);

    useEffect(() => {
        onChange(debouceValue);
    }, [debouceValue]);

    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Tìm kiếm..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-md rounded-none"
            />
        </div>
    );
}

export default DataTableFilter;
