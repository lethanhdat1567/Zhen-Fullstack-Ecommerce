"use client";

import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import Title from "@/app/admin/components/Title/Title";
import PopupItem from "@/app/admin/modals/components/PopupItem/PopupItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { Popup, popupService } from "@/services/popupService";
import { HttpError } from "@/lib/http/errors";
import { toast } from "sonner";
import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";

function ModalPage() {
    const [popups, setPopups] = useState<Popup[]>([]);
    const [loading, setLoading] = useState(true);

    async function handleDragEnd(event: any) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = popups.findIndex((i) => i.id === active.id);
        const newIndex = popups.findIndex((i) => i.id === over.id);

        const reordered = arrayMove(popups, oldIndex, newIndex).map(
            (item, index) => ({
                ...item,
                sort_order: index + 1,
            }),
        );

        setPopups(reordered);

        await popupService.reorder(
            reordered.map((p) => ({
                id: p.id,
                sort_order: p.sort_order,
            })),
        );
    }

    const sortedPopups = [...popups].sort(
        (a, b) => a.sort_order - b.sort_order,
    );

    const fetchPopups = async () => {
        try {
            const res = await popupService.list({ lang: "vi" });

            setPopups(res.items);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPopups();
    }, []);

    async function handleToggleStatus(id: string) {
        try {
            await popupService.toggleStatus(id);
            toast.success("Đổi trạng thái thành công!");
            fetchPopups();
        } catch (error) {
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    async function handleDestroy(id: string) {
        try {
            await popupService.delete(id);
            toast.success("Xóa modals thành công!");
            fetchPopups();
        } catch (error) {
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách modals" />
                <Link href={"/admin/modals/new"}>
                    <Button>
                        <Plus /> Thêm modals mới
                    </Button>
                </Link>
            </div>

            {loading ? (
                <LoadingTable />
            ) : (
                <div className="mt-4 border">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToParentElement]}
                    >
                        <SortableContext
                            items={sortedPopups.map((i) => i.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {sortedPopups.map((item) => (
                                <PopupItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title || ""}
                                    date={item.created_at}
                                    status={item.status || ""}
                                    onChangeStatus={handleToggleStatus}
                                    onDelete={handleDestroy}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            )}
        </div>
    );
}

export default ModalPage;
