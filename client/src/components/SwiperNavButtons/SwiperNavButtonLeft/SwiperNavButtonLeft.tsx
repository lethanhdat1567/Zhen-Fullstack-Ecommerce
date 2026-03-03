import { ArrowLeft } from "lucide-react";

type Props = {
    onClick?: () => void;
    className?: string;
    iconClassName?: string;
    size?: number; // button size (px)
    iconSize?: number; // icon size (px)
};

export function SwiperNavButtonLeft({
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
            className={`${className} flex cursor-pointer items-center justify-center rounded-tr-3xl rounded-bl-3xl`}
        >
            <ArrowLeft size={iconSize} className={iconClassName} />
        </button>
    );
}
