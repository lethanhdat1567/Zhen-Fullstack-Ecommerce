"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import ToggleStatus from "@/app/admin/modals/components/PopupItem/ToggleStatus";
import { Button } from "@/components/ui/button";
import { ChevronRight, GripVertical, Trash } from "lucide-react";
import { formatDateVN } from "@/utils/formatDate";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DestroyAlertDialog from "@/app/admin/components/DestroyAlertDialog/DestroyAlertDialog";
import { useState } from "react";

type Props = {
    id: string;
    title: string;
    date: string;
    status: string;
    onChangeStatus: (id: string) => void;
    onDelete: (id: string) => void;
};

function PopupItem({
    id,
    title,
    date,
    status,
    onChangeStatus,
    onDelete,
}: Props) {
    const [showAlert, setShowAlert] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between border-b bg-white p-2"
        >
            <div className="flex items-center gap-4">
                {/* DRAG HANDLE */}
                <Button
                    variant="ghost"
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <GripVertical />
                </Button>

                <span className="text-sm">{formatDateVN(date)}</span>

                <div className="ml-10 flex flex-col gap-2">
                    <h2 className="text-sm font-medium">{title}</h2>
                    <ToggleStatus
                        status={status}
                        onToggle={() => {
                            onChangeStatus(id);
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={"destructive"}
                            onClick={() => setShowAlert(true)}
                        >
                            <Trash />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Xóa</p>
                    </TooltipContent>
                </Tooltip>

                <DestroyAlertDialog
                    onOpenChange={setShowAlert}
                    open={showAlert}
                    onConfirm={() => onDelete(id)}
                />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href={`/admin/modals/${id}`}>
                            <Button variant={"outline"}>
                                <ChevronRight />
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Xem chi tiết</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}

export default PopupItem;
