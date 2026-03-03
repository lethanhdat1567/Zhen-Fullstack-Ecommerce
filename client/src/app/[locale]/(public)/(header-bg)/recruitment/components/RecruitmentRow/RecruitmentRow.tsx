import { Link } from "@/i18n/navigation";
import { recruitmentService } from "@/services/recruitmentService";
import { getLocale, getTranslations } from "next-intl/server";

async function RecruitmentRow() {
    const t = await getTranslations("Recruitment");
    const locale = await getLocale();

    const res = await recruitmentService.list({
        lang: locale,
        isActive: true,
    });

    const recruitments = res.items || [];

    return (
        <div className="container">
            {/* ================= DESKTOP ================= */}
            <table className="hidden w-full bg-[#f7f7f7] lg:table">
                <thead>
                    <tr className="text-center text-[15px] font-semibold">
                        <th className="w-[10%] border-r border-[#ebebeb] px-4 py-4">
                            STT
                        </th>
                        <th className="w-[30%] border-r border-[#ebebeb] px-4 py-4">
                            Vị trí tuyển dụng
                        </th>
                        <th className="border-r border-[#ebebeb] px-4 py-4">
                            Trạng thái
                        </th>
                        <th className="w-[15%] border-r border-[#ebebeb] px-4 py-4">
                            Số lượng
                        </th>
                        <th className="w-[25%] px-4 py-4">Địa chỉ</th>
                    </tr>
                </thead>

                <tbody>
                    {recruitments.map((item, index) => (
                        <tr key={item.id} className="text-center text-[#555]">
                            {/* STT */}
                            <td className="border-t border-r border-[#ebebeb] px-5 py-6.25">
                                <span className="text-[45px] font-bold text-[#b5b5b5]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </td>

                            {/* TITLE */}
                            <td className="border-t border-r border-[#ebebeb] px-5 py-6.25 text-left leading-7 font-semibold text-[#333]">
                                <Link href={`/recruitment/${item.id}`}>
                                    {item.title || "-"}
                                </Link>
                            </td>

                            {/* STATUS */}
                            <td className="border-t border-r border-[#ebebeb] px-5 py-6.25">
                                <span
                                    className={`inline-block rounded-tl-3xl rounded-br-3xl bg-black px-7.5 py-2 font-bold text-white`}
                                >
                                    {item.status === "active"
                                        ? t("active")
                                        : t("inactive")}
                                </span>
                            </td>

                            {/* QUANTITY */}
                            <td className="border-t border-r border-[#ebebeb] px-5 py-6.25 text-[20px] font-medium">
                                {item.quantity}
                            </td>

                            {/* ADDRESS */}
                            <td className="border-t border-[#ebebeb] px-5 py-6.25 text-[15px] leading-5">
                                {item.address || "-"}
                            </td>
                        </tr>
                    ))}

                    {recruitments.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="border-t py-10 text-center text-gray-500"
                            >
                                Không có vị trí tuyển dụng nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* ================= MOBILE ================= */}
            <div className="space-y-4 lg:hidden">
                {recruitments.map((item, index) => (
                    <div
                        key={item.id}
                        className="rounded-xl bg-[#f7f7f7] p-4 text-[#555]"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#b5b5b5]">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span
                                className={`rounded-tl-2xl rounded-br-2xl bg-black px-4 py-1 text-sm font-bold text-white`}
                            >
                                {item.status === "active"
                                    ? t("active")
                                    : t("inactive")}
                            </span>
                        </div>

                        <Link
                            href={`/recruitment/${item.id}`}
                            className="mb-3 block font-semibold text-[#333]"
                        >
                            {item.title || "-"}
                        </Link>

                        <div className="space-y-1 text-sm">
                            <p>
                                <span className="font-medium">Số lượng:</span>{" "}
                                {item.quantity}
                            </p>

                            <p>
                                <span className="font-medium">Địa chỉ:</span>{" "}
                                {item.address || "-"}
                            </p>
                        </div>
                    </div>
                ))}

                {recruitments.length === 0 && (
                    <div className="text-center text-gray-500">
                        Không có vị trí tuyển dụng nào
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecruitmentRow;
