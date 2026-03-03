interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {
    return (
        <div className="mt-10 flex justify-center gap-4">
            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;

                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`h-8.75 w-8.75 cursor-pointer rounded-tl-[15px] rounded-br-[15px] ${
                            currentPage === page
                                ? "bg-(--primary-color) text-white"
                                : "bg-[#dedede] text-[#666666]"
                        }`}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
}
