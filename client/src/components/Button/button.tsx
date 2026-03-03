import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
}

function Button({ children, className }: ButtonProps) {
    return (
        <button
            className={`inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-tl-2xl rounded-br-2xl px-5 text-sm transition-all duration-300 sm:h-11 sm:text-base lg:h-12 lg:rounded-tl-3xl lg:rounded-br-3xl ${className}`}
        >
            {children}
            <ChevronRight size={18} />
        </button>
    );
}

export default Button;
