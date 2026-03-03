"use client";

import ActionsCell from "@/app/admin/components/ActionColumn/ActionsCell";
import { ColumnDef } from "@tanstack/react-table";

type ActionOption<T> = {
    label: string;
    onClick: (row: T) => void;
    destructive?: boolean;
};

type CreateActionsColumnProps<T> = {
    onUpdate?: (row: T) => void;
    onDelete?: (row: T) => void;
    onDetail?: (row: T) => void;
    extraOptions?: ActionOption<T>[];
};

export function createActionsColumn<T>({
    onUpdate,
    onDelete,
    onDetail,
    extraOptions = [],
}: CreateActionsColumnProps<T>): ColumnDef<T> {
    return {
        id: "actions",
        enableHiding: false,
        enableSorting: false,
        cell: ({ row }) => (
            <ActionsCell
                rowData={row.original as any}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onDetail={onDetail}
                extraOptions={extraOptions}
            />
        ),
    };
}
