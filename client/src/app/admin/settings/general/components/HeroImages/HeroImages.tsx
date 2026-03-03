"use client";

import Galleries, {
    GalleriesType,
} from "@/app/admin/components/Galleries/Galleries";
import Title from "@/app/admin/components/Title/Title";
import { Button } from "@/components/ui/button";
import { HttpError } from "@/lib/http/errors";
import { heroBannerService } from "@/services/heroBannerService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function HeroImages() {
    const [banners, setBanners] = useState<GalleriesType[]>([]);

    const fetchBanners = async () => {
        try {
            const res = await heroBannerService.list();
            console.log(res);

            const resBanners = res.items.map((item) => ({
                ...item,
                file_url: item.thumbnail,
                type: "image",
            }));

            setBanners(resBanners as any);
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    };

    async function handleSave() {
        const payload = banners.map((banner) => ({
            thumbnail: banner.file_url,
            sort_order: banner.sort_order,
        }));

        try {
            await heroBannerService.update(payload);
            toast.success("Cập nhật thành công");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBanners();
    }, []);

    // * Handle upload
    async function handleUpload(galleries: GalleriesType[]) {
        setBanners(galleries);
    }

    return (
        <div>
            <Title title="Quản lý hình ảnh Hero" className="mt-5 pb-3" />
            <p className="text-muted-foreground text-sm italic">
                *Quản lí những hình ảnh sẽ xuất hiện trên trang chủ của bạn
            </p>
            <Galleries
                galleries={banners}
                setGalleries={handleUpload}
                setError={(msg) => {}}
            />
            <div className="mt-2">
                <Button onClick={handleSave}>Cập nhật</Button>
            </div>
        </div>
    );
}

export default HeroImages;
