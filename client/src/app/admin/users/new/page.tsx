"use client";

import TabsTranslate from "@/app/admin/components/TabsTranslate/TabsTranslate";
import Title from "@/app/admin/components/Title/Title";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AdminUserForm } from "@/app/admin/users/new/AdminUserForm";
import { createAdminSchema } from "@/app/admin/users/new/form";
import BackBtn from "@/app/admin/components/BackBtn/BackBtn";

function AdminUserPage() {
    // Form
    const form = useForm<z.infer<typeof createAdminSchema>>({
        resolver: zodResolver(createAdminSchema),
        defaultValues: {
            full_name: "Nguyễn Văn Admin",
            avatar: "/uploads/avatar-admin.jpg",
            username: "admin01",
            email: "admin01@example.com",
            password: "",
        },
    });

    return (
        <div className="mx-auto w-4xl">
            <div className="mb-5 flex items-center gap-4">
                <BackBtn /> <Title title="Thêm tài khoản mới" />
            </div>

            <AdminUserForm form={form} />
        </div>
    );
}

export default AdminUserPage;
