import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Heart } from "lucide-react";

function LikeBtn() {
    const favorites = useFavoriteStore((state) => state.items);

    return (
        <div className="relative block">
            <Link href={"/wishlist"}>
                <Button
                    variant={"ghost"}
                    size={"icon-lg"}
                    className="rounded-full"
                >
                    <Heart />
                </Button>
            </Link>
            <div className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {favorites.length}
            </div>
        </div>
    );
}

export default LikeBtn;
