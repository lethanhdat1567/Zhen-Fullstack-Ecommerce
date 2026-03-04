"use client";

import { Button } from "@/components/ui/button";
import { FavoriteItem } from "@/services/favoriteService";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    item: FavoriteItem;
    type: string;
};

function LikeBtn({ item, type }: Props) {
    const [isLiked, setIsLiked] = useState(false);
    const checkLike = useFavoriteStore((state) => state.isLiked);
    const toggleLike = useFavoriteStore((state) => state.toggleFavorite);
    if (item.id === "s3-05") console.log(item);

    async function handleToggleLike() {
        await toggleLike({ ...item, type: type as any });
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        const fetchLike = async () => {
            const res = await checkLike(item.id, type);
            setIsLiked(res);
        };

        fetchLike();
    }, []);

    return (
        <Button
            variant={"outline"}
            size={"icon-lg"}
            className={`invisible absolute top-4 right-4 rounded-full opacity-0 transition duration-1000 group-hover:visible group-hover:opacity-100 ${isLiked ? "visible opacity-100" : ""}`}
            onClick={handleToggleLike}
        >
            <Heart
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "none"}
            />
        </Button>
    );
}

export default LikeBtn;
