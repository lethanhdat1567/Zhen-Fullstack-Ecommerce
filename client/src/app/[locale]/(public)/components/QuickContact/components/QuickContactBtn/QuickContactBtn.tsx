import { cn } from "@/lib/utils";
import React from "react";

type Props<T extends React.ElementType> = {
    as?: T;
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<T>;

function QuickContactBtn<T extends React.ElementType = "button">({
    as,
    children,
    className,
    ...props
}: Props<T>) {
    const Component = as || "button";

    return (
        <Component
            className={cn(
                "flex min-h-14 min-w-14 cursor-pointer items-center justify-center rounded-tl-2xl rounded-br-2xl border border-white bg-(--primary-color) text-white ring transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/80 hover:shadow-[3px_3px_0_#8D388A,6px_6px_0_#8D388A] focus:ring-2 focus:ring-white/40 focus:outline-none active:translate-y-0 active:shadow-none",
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

export default QuickContactBtn;
