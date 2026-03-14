"use client";

import { AnimateButton } from "@/components/AnimateButton/AnimateButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Lấy page hiện tại từ URL, mặc định là 1
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (page: number) => {
        router.push(createPageURL(page));
    };

    if (totalPages <= 0) return null;

    return (
        <div className="flex items-center gap-4">
            {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                return (
                    <AnimateButton
                        key={page}
                        size="default"
                        variant={isActive ? "primary" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={isActive ? "pointer-events-none" : ""}
                    >
                        {page}
                    </AnimateButton>
                );
            })}
        </div>
    );
}

export default Pagination;
