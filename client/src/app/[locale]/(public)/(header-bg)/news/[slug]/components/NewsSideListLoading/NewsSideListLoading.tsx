import { Skeleton } from "@/components/ui/skeleton";

function NewsSideListLoading() {
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
                <Skeleton className="h-95 w-full rounded-[10px]" />
            </div>

            <div className="col-span-5 flex flex-col gap-5">
                <Skeleton className="h-45 w-full rounded-[10px]" />
                <Skeleton className="h-45 w-full rounded-[10px]" />
            </div>
        </div>
    );
}

export default NewsSideListLoading;
