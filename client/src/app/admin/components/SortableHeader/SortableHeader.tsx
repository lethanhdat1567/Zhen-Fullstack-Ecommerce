"use client";

import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

type SortableHeaderProps<TData, TValue> = {
    column: Column<TData, TValue>;
    title: string;
};

export function SortableHeader<TData, TValue>({
    column,
    title,
}: SortableHeaderProps<TData, TValue>) {
    const sorted = column.getIsSorted();

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(sorted === "asc")}
            className="px-0 hover:bg-transparent"
        >
            {title}

            {sorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
            {sorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
            {!sorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
        </Button>
    );
}
