"use client";

import { Search } from "lucide-react";
import { useState } from "react";

function SearchSection() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={`group relative flex w-full max-w-100 items-center rounded-full border px-4 py-2 transition-all duration-300 ease-in-out ${isFocused ? "border-primary ring-primary/20 bg-white ring-2" : "border-gray-200 bg-gray-100"} `}
        >
            {/* Icon Search */}
            <Search
                size={18}
                className={`transition-colors duration-300 ${isFocused ? "text-primary" : "text-gray-400"}`}
            />

            {/* Input */}
            <input
                className="ml-3 w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                placeholder="Tìm kiếm sản phẩm, tin tức..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {/* Phím tắt (K) - Tạo cảm giác chuyên nghiệp */}
            <div className="group-hover:border-primary/30 hidden items-center gap-1 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 transition-colors md:flex">
                <span className="text-xs">⌘</span> K
            </div>
        </div>
    );
}

export default SearchSection;
