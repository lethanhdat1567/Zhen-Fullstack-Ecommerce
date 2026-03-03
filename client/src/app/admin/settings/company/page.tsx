"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { siteSettingService } from "@/services/siteService";
import { toast } from "sonner";

/* =========================
   SCHEMA
========================= */

const companySchema = z.object({
    phone_number: z
        .string()
        .min(6, "Số điện thoại quá ngắn")
        .optional()
        .or(z.literal("")),

    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),

    address: z.string().min(3, "Địa chỉ quá ngắn").optional().or(z.literal("")),

    open_time: z
        .string()
        .min(3, "Giờ hoạt động quá ngắn")
        .optional()
        .or(z.literal("")),

    facebook_url: z.string().optional().or(z.literal("")),
    instagram_url: z.string().optional().or(z.literal("")),
    tiktok_url: z.string().optional().or(z.literal("")),
    youtube_url: z.string().optional().or(z.literal("")),

    google_map_embed: z.string().optional().or(z.literal("")),
});

type CompanyFormValues = z.infer<typeof companySchema>;

/* =========================
   COMPONENT
========================= */

function CompanyPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<CompanyFormValues>({
        resolver: zodResolver(companySchema),
    });

    const fetchData = async () => {
        try {
            const res = await siteSettingService.get();

            reset({
                phone_number: res.phone_number || "",
                email: res.email || "",
                address: res.address || "",
                open_time: res.open_time || "",
                facebook_url: res.facebook_url || "",
                instagram_url: res.instagram_url || "",
                tiktok_url: res.tiktok_url || "",
                youtube_url: res.youtube_url || "",
                google_map_embed: res.google_map_embed || "",
            });
        } catch (error) {
            toast.error("Không tải được dữ liệu công ty");
        }
    };

    const onSubmit = async (data: CompanyFormValues) => {
        try {
            setLoading(true);
            await siteSettingService.update(data);
            toast.success("Cập nhật thông tin công ty thành công");
        } catch (error) {
            toast.error("Cập nhật thất bại");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-4xl space-y-6"
        >
            <div>
                <h2 className="text-xl font-semibold">Thông tin công ty</h2>
                <p className="text-muted-foreground text-sm">
                    Cập nhật thông tin hiển thị ở footer và trang liên hệ.
                </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <Input {...register("phone_number")} />
                {errors.phone_number && (
                    <p className="text-xs text-red-500">
                        {errors.phone_number.message}
                    </p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input {...register("email")} />
                {errors.email && (
                    <p className="text-xs text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Địa chỉ</label>
                <Textarea {...register("address")} rows={3} />
                {errors.address && (
                    <p className="text-xs text-red-500">
                        {errors.address.message}
                    </p>
                )}
            </div>

            {/* Open Time */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Giờ hoạt động</label>
                <Input {...register("open_time")} />
                {errors.open_time && (
                    <p className="text-xs text-red-500">
                        {errors.open_time.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Facebook</label>
                    <Input {...register("facebook_url")} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Instagram</label>
                    <Input {...register("instagram_url")} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Tiktok</label>
                    <Input {...register("tiktok_url")} />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Youtube</label>
                    <Input {...register("youtube_url")} />
                </div>

                <p className="text-muted-foreground text-sm italic">
                    *Những đường link bỏ trống sẽ không hiện trên trang Web
                </p>
            </div>

            {/* Google Map Embed */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Google Map Embed</label>
                <Textarea
                    {...register("google_map_embed")}
                    rows={4}
                    placeholder="<iframe src='https://www.google.com/maps/embed?...'></iframe>"
                />
                <p className="text-muted-foreground text-xs">
                    Dán mã iframe Google Maps vào đây
                </p>
            </div>

            {/* Preview */}
            {watch("google_map_embed") && (
                <div className="mt-4">
                    <p className="mb-2 text-sm font-medium">Xem trước bản đồ</p>

                    <div className="h-[400px] w-full overflow-hidden rounded-md">
                        <div
                            className="h-full w-full"
                            dangerouslySetInnerHTML={{
                                __html:
                                    watch("google_map_embed")
                                        ?.replace(/width="[^"]*"/, "")
                                        ?.replace(/height="[^"]*"/, "")
                                        ?.replace(
                                            "<iframe",
                                            '<iframe class="w-full h-full"',
                                        ) || "",
                            }}
                        />
                    </div>
                </div>
            )}

            <Button type="submit" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu thông tin"}
            </Button>
        </form>
    );
}

export default CompanyPage;
