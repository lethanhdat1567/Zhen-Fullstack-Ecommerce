import { envConfig } from "@/config/envConfig";
import { mailer } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { adminService } from "@/services/admin.service";
import { paginate } from "@/services/pagination.service";
import { siteSettingService } from "@/services/site-setting.service";
import { AppError } from "@/utils/appError";

export interface CreateContactDTO {
    fullname: string;
    phone_number?: string;
    email: string;
    content: string;
}

export interface ListContactQuery {
    search?: string;
}

export const contactService = {
    /* =========================
       CREATE (PUBLIC)
    ========================= */

    async create(data: CreateContactDTO) {
        if (!data.fullname || !data.email || !data.content) {
            throw new AppError("Vui lòng nhập đầy đủ thông tin bắt buộc.", 400);
        }

        const contact = await prisma.contacts.create({
            data: {
                fullname: data.fullname,
                phone_number: data.phone_number,
                email: data.email,
                content: data.content,
            },
        });

        await mailer.sendMail({
            from: envConfig.mail.from,
            to: data.email,
            subject: "Chúng tôi đã nhận được liên hệ của bạn",
            html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="margin-bottom:16px;">Cảm ơn bạn đã liên hệ</h2>

            <p>Xin chào <strong>${data.fullname}</strong>,</p>

            <p>Chúng tôi đã nhận được thông tin bạn gửi và sẽ phản hồi trong thời gian sớm nhất.</p>

            <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:20px 0;">
                <p><strong>Thông tin bạn đã gửi:</strong></p>
                <p><strong>Họ tên:</strong> ${data.fullname}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.phone_number ? `<p><strong>Số điện thoại:</strong> ${data.phone_number}</p>` : ""}
                <p><strong>Nội dung:</strong></p>
                <p style="white-space:pre-line;">${data.content}</p>
            </div>

            <p>Trân trọng,<br/>Đội ngũ hỗ trợ</p>
        </div>
    `,
        });

        const res = await adminService.findAll();
        res.items.forEach((item: any) => {
            mailer.sendMail({
                from: envConfig.mail.from,
                to: item.email || envConfig.mail.user,
                subject: "🔔 Có liên hệ mới từ website",
                html: `
            <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="margin-bottom:16px;">Bạn có một liên hệ mới</h2>
    
                <div style="background:#f9f9f9;padding:16px;border-radius:8px;">
                    <p><strong>Họ tên:</strong> ${data.fullname}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    ${data.phone_number ? `<p><strong>Số điện thoại:</strong> ${data.phone_number}</p>` : ""}
                    <p><strong>Thời gian:</strong> ${new Date().toLocaleString()}</p>
    
                    <hr style="margin:16px 0;" />
    
                    <p><strong>Nội dung:</strong></p>
                    <p style="white-space:pre-line;">${data.content}</p>
                </div>
            </div>
        `,
            });
        });

        return contact;
    },

    /* =========================
       LIST (ADMIN)
    ========================= */

    async findAll(params?: ListContactQuery) {
        const where = params?.search
            ? {
                  OR: [
                      {
                          fullname: {
                              contains: params.search,
                          },
                      },
                      {
                          email: {
                              contains: params.search,
                          },
                      },
                      {
                          phone_number: {
                              contains: params.search,
                          },
                      },
                  ],
              }
            : {};

        const result = await paginate(prisma.contacts, params ?? ({} as any), {
            where,
            orderBy: {
                created_at: "desc",
            },
        });

        return result;
    },

    /* =========================
       DETAIL
    ========================= */

    async findById(id: string) {
        return prisma.contacts.findUnique({
            where: { id },
        });
    },

    /* =========================
       DELETE
    ========================= */

    async delete(id: string) {
        return prisma.contacts.delete({
            where: { id },
        });
    },

    async bulkDelete(ids: string[]) {
        if (!ids?.length) {
            throw new AppError("Danh sách ID không hợp lệ.", 400);
        }

        const result = await prisma.contacts.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        return {
            deletedCount: result.count,
        };
    },
};
