"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { navService } from "@/services/navService";
import { HttpError } from "@/lib/http/errors";
import { toast } from "sonner";

interface NavItem {
    id: string;
    name: string;
    code: string;
    status: "active" | "inactive";
}

function NavsSetting() {
    const [navs, setNavs] = useState<NavItem[]>([]);

    const fetchNavs = async () => {
        try {
            const res = await navService.getAll();
            setNavs(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNavs();
    }, []);

    async function handleToggle(id: string) {
        try {
            const res = await navService.toggleStatus(id);
            setNavs((prevNavs) =>
                prevNavs.map((nav) => (nav.id === id ? res : nav)),
            );

            toast.success("Đổi trạng thái thành công!");
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Cấu hình Menu</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên</TableHead>
                                <TableHead className="text-center">
                                    Trạng thái
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {navs.map((nav) => (
                                <TableRow key={nav.id}>
                                    <TableCell>{nav.name}</TableCell>
                                    <TableCell className="text-center">
                                        <Switch
                                            checked={nav.status === "active"}
                                            onCheckedChange={() =>
                                                handleToggle(nav.id)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <p className="text-muted-foreground mt-2 text-sm italic">
                *Tắt/bật trạng thái để ẩn hiện menu trên website
            </p>
        </div>
    );
}

export default NavsSetting;
