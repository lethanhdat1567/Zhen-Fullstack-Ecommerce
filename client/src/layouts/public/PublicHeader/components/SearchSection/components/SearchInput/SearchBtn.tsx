import { Search } from "lucide-react";

type Props = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

function SearchInput({ searchValue, setSearchValue }: Props) {
    return (
        <div
            className={`group relative flex w-full items-center rounded-full border bg-white px-4 py-2 transition-all duration-300 ease-in-out`}
        >
            {/* Icon Search */}
            <Search
                size={18}
                className={`transition-colors duration-300`}
                color="black"
            />

            {/* Input */}
            <input
                className="ml-3 w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                placeholder="Tìm kiếm sản phẩm, tin tức..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            {/* Phím tắt (K) - Tạo cảm giác chuyên nghiệp */}
            <div className="group-hover:border-primary/30 hidden items-center gap-1 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 transition-colors md:flex">
                <span className="text-xs">⌘</span> K
            </div>
        </div>
    );
}

export default SearchInput;
