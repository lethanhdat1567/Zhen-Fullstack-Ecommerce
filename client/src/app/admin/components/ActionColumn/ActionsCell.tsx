import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import DestroyAlertDialog from "@/app/admin/components/DestroyAlertDialog/DestroyAlertDialog";
import { useState } from "react";
import { toast } from "sonner";

type ActionOption<T> = {
    label: string;
    onClick: (row: T) => void;
    destructive?: boolean;
};

function ActionsCell<T>({
    rowData,
    onUpdate,
    onDelete,
    onDetail,
    extraOptions,
}: {
    rowData: T & { id?: string };
    onUpdate?: (row: T) => void;
    onDelete?: (row: T) => void;
    onDetail?: (row: T) => void;
    extraOptions: ActionOption<T>[];
}) {
    const [alert, setAlert] = useState(false);

    const handleCopyId = async () => {
        if (!rowData?.id) return;
        await navigator.clipboard.writeText(rowData.id);
        toast.success("Đã sao chép ID");
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    {rowData?.id && (
                        <DropdownMenuItem onClick={handleCopyId}>
                            Sao chép ID
                        </DropdownMenuItem>
                    )}

                    {(onUpdate || onDelete) && rowData?.id && (
                        <DropdownMenuSeparator />
                    )}

                    {onUpdate && (
                        <DropdownMenuItem onClick={() => onUpdate(rowData)}>
                            Cập nhật
                        </DropdownMenuItem>
                    )}

                    {onDetail && (
                        <DropdownMenuItem onClick={() => onDetail(rowData)}>
                            Chi tiết
                        </DropdownMenuItem>
                    )}

                    {onDelete && (
                        <DropdownMenuItem
                            onClick={() => setAlert(true)}
                            className="text-red-600 focus:text-red-600"
                        >
                            Xóa
                        </DropdownMenuItem>
                    )}

                    {extraOptions.length > 0 && <DropdownMenuSeparator />}

                    {extraOptions.map((option, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => option.onClick(rowData)}
                            className={
                                option.destructive
                                    ? "text-red-600 focus:text-red-600"
                                    : ""
                            }
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DestroyAlertDialog
                open={alert}
                onOpenChange={setAlert}
                onConfirm={() => {
                    onDelete?.(rowData);
                    setAlert(false);
                }}
            />
        </>
    );
}

export default ActionsCell;
