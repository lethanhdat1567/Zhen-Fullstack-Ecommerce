import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<
    TData,
    TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    const isAsc = column.getIsSorted() === "asc";
    const isDesc = column.getIsSorted() === "desc";

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(isAsc)}
            className={cn(
                "-ml-3 flex h-8 items-center gap-1",
                "hover:text-foreground",
                className,
            )}
        >
            <span>{title}</span>

            {isAsc && <ArrowUp className="h-4 w-4" />}
            {isDesc && <ArrowDown className="h-4 w-4" />}

            {!isAsc && !isDesc && (
                <ArrowUpDown className="h-4 w-4 opacity-40" />
            )}
        </Button>
    );
}
