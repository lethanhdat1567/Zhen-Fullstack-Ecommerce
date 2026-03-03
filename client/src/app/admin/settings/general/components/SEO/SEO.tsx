"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { siteSettingService } from "@/services/siteService";
import { toast } from "sonner";

function SEO() {
    const [form, setForm] = useState({
        meta_title_default: "",
        meta_description_default: "",
    });

    const [loading, setLoading] = useState(false);

    const fetchSeo = async () => {
        try {
            const res = await siteSettingService.get();
            setForm({
                meta_title_default: res.meta_title_default || "",
                meta_description_default: res.meta_description_default || "",
            });
        } catch (error) {
            console.log(error);
            toast.error("Không tải được dữ liệu SEO");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await siteSettingService.update(form);
            toast.success("Cập nhật SEO thành công");
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật SEO thất bại");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeo();
    }, []);

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Cấu hình SEO mặc định</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Thiết lập tiêu đề và mô tả SEO mặc định cho toàn website.
                </p>
            </div>

            {/* Meta Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Meta Title mặc định
                </label>
                <Input
                    name="meta_title_default"
                    value={form.meta_title_default}
                    onChange={handleChange}
                    placeholder="Nhập meta title..."
                />
                <p className="text-muted-foreground text-xs">
                    {form.meta_title_default.length} ký tự (khuyến nghị 50–60)
                </p>
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Meta Description mặc định
                </label>
                <Textarea
                    name="meta_description_default"
                    value={form.meta_description_default}
                    onChange={handleChange}
                    placeholder="Nhập meta description..."
                    rows={4}
                />
                <p className="text-muted-foreground text-xs">
                    {form.meta_description_default.length} ký tự (khuyến nghị
                    140–160)
                </p>
            </div>

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu cấu hình SEO"}
            </Button>
        </div>
    );
}

export default SEO;
