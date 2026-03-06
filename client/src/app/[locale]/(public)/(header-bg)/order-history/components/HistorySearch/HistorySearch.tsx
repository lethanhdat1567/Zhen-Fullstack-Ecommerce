import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce"; // Hook của bạn

type Props = {
    searchTerm: string; // Giá trị khởi tạo hoặc từ URL
    onSearchChange: (value: string) => void;
};

function HistorySearch({ searchTerm, onSearchChange }: Props) {
    // 1. State nội bộ để quản lý việc nhập liệu tức thì
    const [localValue, setLocalValue] = useState(searchTerm);

    // 2. Sử dụng hook debounce lên giá trị local
    const debouncedValue = useDebounce(localValue, 500);

    // 3. Khi giá trị đã debounce thay đổi, mới báo lên component cha để gọi API
    useEffect(() => {
        onSearchChange(debouncedValue);
    }, [debouncedValue, onSearchChange]);

    // 4. Đồng bộ ngược: Nếu trang cha xóa search (reset), localValue cũng phải xóa theo
    useEffect(() => {
        setLocalValue(searchTerm);
    }, [searchTerm]);

    return (
        <div className="relative my-6 w-full max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

            <Input
                placeholder="Tìm theo mã đơn hàng hoặc tên sản phẩm..."
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="pl-10"
            />
        </div>
    );
}

export default HistorySearch;
