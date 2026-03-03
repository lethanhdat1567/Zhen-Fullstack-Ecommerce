"use client";

import LoadingTable from "@/app/admin/components/LoadingTable/LoadingTable";
import Title from "@/app/admin/components/Title/Title";
import contactColumns from "@/app/admin/contacts/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { Contact, contactService } from "@/services/contactService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AdminUser() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 7,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const res = await contactService.list({
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: search,
            });

            setContacts(res.items);
            setTotalPages(res.pagination.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    async function handleBulkDestroy(rows: any) {
        const ids = rows.map((item: any) => item.original.id);

        try {
            await contactService.bulkDelete(ids);
            toast.success("Xóa thành công!");
            fetchContacts();
        } catch (error) {
            console.log(error);
            toast.error("Xóa thất bại!");
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchContacts();
    }, [pagination, search]);

    return (
        <div>
            <div className="flex items-center justify-between">
                <Title title="Danh sách liên hệ" />
            </div>
            <div>
                {loading ? (
                    <LoadingTable />
                ) : (
                    <DataTable
                        columns={
                            contactColumns({
                                onRefreshs: () => {
                                    fetchContacts();
                                },
                                router,
                            }) as any
                        }
                        data={contacts}
                        onDestroy={handleBulkDestroy}
                        pageCount={totalPages ?? 0}
                        pagination={pagination}
                        setPagination={setPagination}
                        search={search}
                        setSearch={setSearch}
                    />
                )}
            </div>
        </div>
    );
}

export default AdminUser;
