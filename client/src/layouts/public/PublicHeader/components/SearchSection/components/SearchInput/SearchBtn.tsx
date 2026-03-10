import { Search, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "@/i18n/navigation";

type Props = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    onFocus: () => void;
    onClear: () => void;
};

function SearchInput({
    searchValue,
    setSearchValue,
    loading,
    onFocus,
    onClear,
}: Props) {
    const router = useRouter();

    return (
        <div
            className={`group relative flex w-full items-center rounded-full border bg-white px-4 py-2 transition-all duration-300 ease-in-out`}
        >
            <Search
                size={18}
                className={`transition-colors duration-300`}
                color="black"
            />

            <input
                className="ml-3 w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                placeholder="Tìm kiếm sản phẩm, tin tức..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        router.push(`/search?p=${searchValue}&tab=product`);
                    }
                }}
                onFocus={onFocus}
            />

            {loading && <Spinner className="text-black" />}
            {searchValue && !loading && (
                <button
                    className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-500 hover:bg-neutral-800"
                    onClick={onClear}
                >
                    <X size={10} />
                </button>
            )}
        </div>
    );
}

export default SearchInput;
