import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";

type Props = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

function HistorySearch({ searchTerm, onSearchChange }: Props) {
    const t = useTranslations("OrderHistory.search");
    const [localValue, setLocalValue] = useState(searchTerm);
    const debouncedValue = useDebounce(localValue, 500);

    useEffect(() => {
        onSearchChange(debouncedValue);
    }, [debouncedValue, onSearchChange]);

    useEffect(() => {
        setLocalValue(searchTerm);
    }, [searchTerm]);

    return (
        <div className="relative my-6 w-full max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

            <Input
                placeholder={t("placeholder")}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="pl-10"
            />
        </div>
    );
}

export default HistorySearch;
