// loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="container space-y-8 py-10">
            {/* Nút Back Skeleton */}
            <Skeleton className="h-10 w-24" />

            {/* Header Skeleton */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Customer Card Skeleton */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full max-w-[300px]" />
                    <Skeleton className="h-4 w-full max-w-[250px]" />
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                </CardContent>
            </Card>

            {/* Service Card Skeleton */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Card Skeleton */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-28" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex justify-between border-t pt-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
