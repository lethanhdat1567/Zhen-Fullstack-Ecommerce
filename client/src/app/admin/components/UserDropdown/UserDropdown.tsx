"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resolveMediaSrc } from "@/lib/image";
import { Separator } from "@/components/ui/separator";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { User as UserType, userService } from "@/services/userService";

function UserDropdown() {
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const router = useRouter();
    const admin = useAuthStore((state) => state.user);
    const [info, setInfo] = useState<UserType | null>(null);

    async function handleLogout() {
        try {
            await authService.logoutFromClientToServer({
                refreshToken: refreshToken || "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            clearAuth();
            router.push("/login");
        }
    }

    const fetchProfile = async () => {
        try {
            if (!admin) return;

            const res = await userService.detail(admin.id);

            setInfo(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [admin]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-10 w-10">
                    <AvatarImage
                        src={resolveMediaSrc(admin?.avatar) as string}
                        className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                side="bottom"
                className="w-60 rounded-none border"
            >
                <div className="flex items-center gap-2 p-2">
                    <div>
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src={resolveMediaSrc(admin?.avatar) as string}
                                className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h2 className="text-md font-medium">
                            {info?.username}
                        </h2>
                        <h3 className="text-muted-foreground text-xs">
                            {admin?.email}
                        </h3>
                    </div>
                </div>
                <Separator className="mb-2" />
                <DropdownMenuGroup>
                    <Link href="/admin/profile">
                        <DropdownMenuItem className="rounded-none">
                            <User /> Trang cá nhân
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={handleLogout}
                        className="rounded-none"
                    >
                        <LogOut /> Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserDropdown;
