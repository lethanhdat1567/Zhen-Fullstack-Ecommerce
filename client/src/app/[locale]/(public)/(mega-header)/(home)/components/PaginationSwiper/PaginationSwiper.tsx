"use client";

import { useEffect, useRef } from "react";

type Props = {
    total: number;
    activeIndex: number;
    onClick: (index: number) => void;
    dot?: string;
    borderDot?: string;
    className?: string;

    autoPlay?: boolean;
    delay?: number;
};

function PaginationSwiper({
    total,
    activeIndex,
    onClick,
    dot = "bg-white",
    borderDot = "border-white",
    className = "",
    autoPlay = false,
    delay = 5000,
}: Props) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!autoPlay || total <= 1) return;

        intervalRef.current = setInterval(() => {
            const nextIndex = activeIndex === total - 1 ? 0 : activeIndex + 1;
            onClick(nextIndex);
        }, delay);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [activeIndex, autoPlay, total, delay, onClick]);

    if (total <= 0) return null;

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {Array.from({ length: total }).map((_, index) => {
                const isActive = index === activeIndex;

                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onClick(index)}
                        className="relative flex cursor-pointer items-center justify-center"
                    >
                        {isActive ? (
                            <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${borderDot}`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${dot}`}
                                />
                            </span>
                        ) : (
                            <span
                                className={`h-1.5 w-1.5 rounded-full opacity-50 ${dot}`}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default PaginationSwiper;
