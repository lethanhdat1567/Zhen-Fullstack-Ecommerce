import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

function ErrorBlock() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <XCircle className="h-16 w-16 text-red-500" />

            <h2 className="text-2xl font-semibold text-red-600">
                Thanh toán thất bại
            </h2>

            <p className="max-w-md text-gray-500">
                Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc
                chọn phương thức thanh toán khác.
            </p>

            <div className="mt-4 flex gap-3">
                <Button asChild>
                    <Link href="/checkout">Thanh toán lại</Link>
                </Button>

                <Button variant="outline" asChild>
                    <Link href="/">Quay về trang chủ</Link>
                </Button>
            </div>
        </div>
    );
}

export default ErrorBlock;
