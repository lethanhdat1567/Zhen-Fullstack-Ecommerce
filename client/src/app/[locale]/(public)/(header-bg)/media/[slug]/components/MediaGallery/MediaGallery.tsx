"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import {
    mediaAlbumService,
    Pagination as PaginationType,
} from "@/services/mediaAlbumService";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import MediaOverlay from "@/app/[locale]/(public)/(header-bg)/media/[slug]/components/MediaGallery/components/MediaOverlay/MediaOverlay";
import { chunkArray } from "@/app/[locale]/(public)/(header-bg)/media/[slug]/components/MediaGallery/helpers";
import { Skeleton } from "@/components/ui/skeleton";

export default function MediaGallery() {
    const t = useTranslations("Media");
    const params = useParams();
    const { slug } = params;
    const locale = useLocale();

    const [mediaData, setMediaData] = useState<any[]>([]);
    const [pagination, setPagination] = useState<PaginationType>({
        total: 0,
        page: 1,
        limit: 8,
        totalPages: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchMedia = async () => {
        try {
            setLoading(true);

            const res = await mediaAlbumService.list({
                page: currentPage,
                limit: 8,
                lang: locale,
                categorySlug: slug as string,
            });

            setPagination(res.pagination);
            setMediaData(res.items as any[]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, [locale, slug, currentPage]);

    const groups = chunkArray(mediaData, 3);

    if (loading) {
        return (
            <div className="space-y-6">
                {[0, 1].map((index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 gap-6 lg:h-[600px] lg:grid-cols-3 lg:grid-rows-2"
                    >
                        <Skeleton className="aspect-[4/3] w-full rounded-lg lg:col-span-2 lg:row-span-2 lg:aspect-auto" />
                        <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                        <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                    </div>
                ))}
            </div>
        );
    }

    if (mediaData.length === 0)
        return (
            <div className="text-sm text-neutral-600 italic">
                {t("emptyMedia")}
            </div>
        );

    return (
        <>
            <div className="space-y-6">
                {groups.map((group: any[], groupIndex: number) => {
                    const isReversed = groupIndex % 2 === 1;

                    const large = group[0];
                    const smallTop = group[1];
                    const smallBottom = group[2];

                    return (
                        <div
                            key={groupIndex}
                            className="grid grid-cols-1 gap-6 lg:h-150 lg:grid-cols-3 lg:grid-rows-2"
                        >
                            {/* LARGE */}
                            {large && (
                                <div
                                    className={`relative aspect-4/3 lg:aspect-auto ${
                                        isReversed
                                            ? "lg:col-span-2 lg:col-start-2 lg:row-span-2"
                                            : "lg:col-span-2 lg:row-span-2"
                                    } `}
                                >
                                    <MediaOverlay mediaAlbum={large} />
                                </div>
                            )}

                            {/* SMALL TOP */}
                            {smallTop && (
                                <div
                                    className={`relative aspect-4/3 ${
                                        isReversed
                                            ? "lg:col-start-1 lg:row-start-1"
                                            : "lg:col-start-3 lg:row-start-1"
                                    } `}
                                >
                                    <MediaOverlay mediaAlbum={smallTop} />
                                </div>
                            )}

                            {/* SMALL BOTTOM */}
                            {smallBottom && (
                                <div
                                    className={`relative aspect-4/3 ${
                                        isReversed
                                            ? "lg:col-start-1 lg:row-start-2"
                                            : "lg:col-start-3 lg:row-start-2"
                                    } `}
                                >
                                    <MediaOverlay mediaAlbum={smallBottom} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {pagination.totalPages > 1 && (
                <div className="mt-10">
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </>
    );
}
