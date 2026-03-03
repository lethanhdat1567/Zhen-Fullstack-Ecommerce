"use client";

import {
    ColumnDef,
    flexRender,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    useReactTable,
    getCoreRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/DataTable/pagination";
import React from "react";
import DataTableFilter from "@/components/DataTable/Filter";
import { DataTableViewOptions } from "@/components/DataTable/Visibility";
import DestroyBtn from "@/components/DataTable/DestroyBtn";
import { getSortedRowModel } from "@tanstack/react-table";

interface DataTableOptions {
    filterColumn?: string;
    enableColumnVisibility?: boolean;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];

    pageCount: number;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    setPagination: React.Dispatch<
        React.SetStateAction<{
            pageIndex: number;
            pageSize: number;
        }>
    >;

    search?: string;
    setSearch?: (value: string) => void;

    options?: DataTableOptions;
    onDestroy: (rows: any) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageCount,
    pagination,
    setPagination,
    search,
    setSearch,

    onDestroy,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,

        pageCount,
        manualPagination: true,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },

        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div>
            <div className="flex items-center gap-2 py-4">
                <div className="flex items-center gap-2">
                    {setSearch && (
                        <DataTableFilter value={search} onChange={setSearch} />
                    )}
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <DestroyBtn
                            table={table}
                            onDestroy={() =>
                                onDestroy(
                                    table.getFilteredSelectedRowModel().rows,
                                )
                            }
                        />
                    )}
                </div>

                <DataTableViewOptions table={table} />
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không có kết quả.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>
    );
}
