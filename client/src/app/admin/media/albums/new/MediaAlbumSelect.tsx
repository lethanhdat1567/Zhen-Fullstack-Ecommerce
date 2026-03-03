"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MediaCategory,
    mediaCategoryService,
} from "@/services/mediaCategoryService";
import { useEffect, useState } from "react";

function MediaAlbumSelect({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const [categories, setCategories] = useState<MediaCategory[]>([]);

    const fetchCategories = async () => {
        try {
            const res = await mediaCategoryService.list({ lang: "vi" });
            setCategories(res.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCategories();
    }, []);

    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Thể loại" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default MediaAlbumSelect;
