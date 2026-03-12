import { Skeleton } from "@/components/ui/skeleton";

function ProductItemsLoading() {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Skeleton className="h-70 w-full" />
            <Skeleton className="h-5 w-10/12" />
            <Skeleton className="h-4 w-6/12" />
            <Skeleton className="h-12 w-7/12 rounded-tl-4xl rounded-br-4xl" />
        </div>
    );
}

export default ProductItemsLoading;
