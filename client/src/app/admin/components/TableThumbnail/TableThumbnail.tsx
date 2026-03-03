import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolveMediaSrc } from "@/lib/image";

type TableThumbnailProps = {
    src?: string | null;
    alt?: string;
    fallbackText?: string;
    size?: "sm" | "md" | "lg";
};

const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
};

function TableThumbnail({
    src,
    alt = "thumbnail",
    fallbackText = "NA",
    size = "sm",
}: TableThumbnailProps) {
    return (
        <Avatar className={`${sizeClasses[size]} rounded-sm`}>
            {src && (
                <AvatarImage
                    src={resolveMediaSrc(src) as string}
                    alt={alt}
                    className="rounded-sm object-cover"
                />
            )}
            <AvatarFallback className="rounded-sm">
                {fallbackText.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}

export default TableThumbnail;
