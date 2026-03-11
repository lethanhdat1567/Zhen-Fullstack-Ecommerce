import { Link, useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
    ChevronDown,
    History,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authService } from "@/services/authService";
import { useCartStore } from "@/store/useCartStore";
import { useFavoriteStore } from "@/store/useFavoriteStore";

function UserSection() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const clearCart = useCartStore((state) => state.clearCart);
    const clearFavoriate = useFavoriteStore((state) => state.clearFavorites);

    async function handleLogout() {
        try {
            await authService.logoutFromClientToServer({
                refreshToken: refreshToken || "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            clearAuth();
            clearCart();
            clearFavoriate();
            router.push("/login");
        }
    }

    if (user)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <div className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent p-1 pr-2 transition-all hover:border-white/20 hover:bg-white/10">
                        {/* Avatar tròn tạo điểm nhấn thị giác */}
                        <Avatar className="h-8 w-8 border border-white/20">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-yellow-500 text-xs font-bold text-black">
                                {user.username[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="hidden flex-col items-start leading-none md:flex">
                            <span className="text-xs font-semibold text-white">
                                {user.username}
                            </span>
                            <span className="mt-0.5 text-[10px] text-white/60">
                                {user.role === "admin"
                                    ? "Quản trị viên"
                                    : "Thành viên"}
                            </span>
                        </div>

                        <ChevronDown size={14} className="ml-1 text-white/60" />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="z-9999 mt-2 w-56 shadow-xl"
                >
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm leading-none font-medium">
                                {user.username}
                            </p>
                            <p className="text-muted-foreground text-xs leading-none">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Hồ sơ của tôi</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            router.push("/orders");
                        }}
                    >
                        <History className="mr-2 h-4 w-4" />
                        <span>Đơn mua của bạn</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Cài đặt</span>
                    </DropdownMenuItem>

                    {user.role === "admin" && (
                        <DropdownMenuItem className="text-primary focus:text-primary cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Trang quản trị</span>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

    return (
        <div className="flex items-center gap-2 text-sm font-normal">
            <User size={22} strokeWidth={1.5} />{" "}
            <Link
                className="transition hover:text-yellow-500"
                href={"/register"}
            >
                Đăng ký
            </Link>{" "}
            /{" "}
            <Link className="transition hover:text-yellow-500" href={"/login"}>
                Đăng nhập
            </Link>
        </div>
    );
}

export default UserSection;
