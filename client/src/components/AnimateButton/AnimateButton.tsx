import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const animateButtonVariants = cva(
    "cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-tr-xl rounded-bl-xl text-sm  transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                primary:
                    "bg-(--primary-color) text-white hover:-translate-x-1 hover:shadow-[2px_-2px_0_#fff,2px_2px_0_#fff,4px_4px_0_#fff]",

                outline:
                    "border-2 border-(--primary-color) bg-transparent text-(--primary-color) hover:-translate-x-1 hover:shadow-[2px_-2px_0_var(--primary-color),2px_2px_0_var(--primary-color),4px_4px_0_var(--primary-color)]",

                ghost: "hover:bg-slate-100 hover:text-(--primary-color)",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-12 px-8 text-md lg:text-lg",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "lg",
        },
    },
);

export interface AnimateButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof animateButtonVariants> {
    asChild?: boolean;
}

const AnimateButton = React.forwardRef<HTMLButtonElement, AnimateButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(
                    animateButtonVariants({ variant, size, className }),
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
AnimateButton.displayName = "AnimateButton";

export { AnimateButton, animateButtonVariants };
