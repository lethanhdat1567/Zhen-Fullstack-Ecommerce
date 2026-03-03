import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/app/admin/components/SortableItem/SortableItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import GalleriesItem from "@/app/admin/components/Galleries/GalleriesItem";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import UploadBtn from "@/app/admin/components/Galleries/UploadBtn";
import { MediaType } from "@/app/admin/components/Galleries/helpers";
import { useState } from "react";

export type GalleriesType = {
    id: string;
    type: "image" | "video";
    file_url: string;
    sort_order: number;
};

type Props = {
    galleries: GalleriesType[];
    setGalleries: (galleries: GalleriesType[]) => void;
    setError: (error: string) => void;
    type?: MediaType;
};

function Galleries({
    galleries,
    setGalleries,
    setError,
    type = "image",
}: Props) {
    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = galleries.findIndex((i) => i.id === active.id);
        const newIndex = galleries.findIndex((i) => i.id === over.id);

        const reordered = arrayMove(galleries, oldIndex, newIndex).map(
            (item, index) => ({
                ...item,
                sort_order: index + 1,
            }),
        );

        setGalleries(reordered);
    }

    function handleUpload(newGalleries: GalleriesType[]) {
        setGalleries([...galleries, ...newGalleries]);
    }

    function handleDestroy(id: string) {
        const newGalleries = galleries.filter((i) => i.id !== id);

        setGalleries(newGalleries);
    }

    const sortedGalleries = [...galleries].sort(
        (a, b) => a.sort_order - b.sort_order,
    );

    return (
        <div>
            <div className="my-2 flex items-center justify-between">
                <div className="text-sm font-medium">
                    Hình ảnh ({galleries.length})
                </div>
                <UploadBtn
                    onChange={handleUpload}
                    currentTotalGalleries={galleries.length}
                    onError={setError}
                    type={type}
                />
            </div>
            {galleries.length <= 0 ? (
                <div className="text-muted-foreground flex h-44 items-center justify-center border text-sm">
                    Không có hình ảnh
                </div>
            ) : (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToParentElement]}
                >
                    <SortableContext
                        items={galleries.map((i) => i.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid min-h-44 grid-cols-5 gap-5 border p-4">
                            {sortedGalleries.map((item) => (
                                <SortableItem key={item.id} id={item.id}>
                                    <GalleriesItem
                                        id={item.id}
                                        src={item.file_url}
                                        type={item.type}
                                        onDestroy={handleDestroy}
                                    />
                                </SortableItem>
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
            <p className="text-muted-foreground mt-1 text-sm italic">
                *Danh sách hình ảnh theo thứ tự, bạn có thể kéo thả ảnh để sắp
                xếp chúng
            </p>
        </div>
    );
}

export default Galleries;
