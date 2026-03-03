import { Skeleton } from "@/components/ui/skeleton";

function DetailItemLoading() {
    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5 flex flex-col gap-4">
                {/* Main image */}
                <Skeleton className="h-105 w-full" />

                {/* Thumbnails */}
                <div className="flex justify-center gap-3">
                    <Skeleton className="h-20 w-20" />
                    <Skeleton className="h-20 w-20" />
                    <Skeleton className="h-20 w-20" />
                    <Skeleton className="h-20 w-20" />
                    <Skeleton className="h-20 w-20" />
                </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="col-span-7 flex flex-col gap-4">
                {/* Title */}
                <Skeleton className="h-8 w-3/4" />

                {/* Divider icon */}
                <Skeleton className="h-5 w-24" />

                {/* Price */}
                <Skeleton className="h-7 w-40" />

                {/* Description title */}
                <Skeleton className="mt-4 h-5 w-24" />

                {/* Description text */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />

                {/* Quantity + Button */}
                <div className="mt-4 flex items-center gap-4">
                    <Skeleton className="h-11 w-32 rounded-lg" />
                    <Skeleton className="h-11 w-40 rounded-lg" />
                </div>

                {/* SKU */}
                <Skeleton className="mt-2 h-4 w-32" />
            </div>
        </div>
    );
}

export default DetailItemLoading;
