"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { productCategoryService } from "@/services/productCategoryService";
import { productService } from "@/services/productService";
import { useEffect, useState } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

function ProductSelect({ value, onChange }: Props) {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await productCategoryService.list({ lang: "vi" });

            setCategories(res.items as any);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCategories();
    }, []);

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default ProductSelect;
