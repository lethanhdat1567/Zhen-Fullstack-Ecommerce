import { ArrowRight } from "lucide-react";

type Props = {
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
    size?: number; // size button (px)
    iconSize?: number; // size icon (px)
};

export function SwiperNavButtonRight({
    onClick,
    className = "",
    iconClassName = "",
    size = 48,
    iconSize = 20,
}: Props) {
    return (
        <button
            onClick={onClick}
            style={{
                width: size,
                height: size,
            }}
            className={`${className} flex cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl`}
        >
            <ArrowRight size={iconSize} className={iconClassName} />
        </button>
    );
}
