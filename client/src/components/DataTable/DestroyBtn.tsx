import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

function DestroyBtn({ table, onDestroy }: { table: any; onDestroy: any }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={"destructive"}
                    className="rounded-none"
                    // onClick={() => onDestroy(table.getFilteredSelectedRowModel().rows)}
                >
                    <Trash />
                    Xóa ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Bạn có chắc chắn muốn xóa?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh
                        viễn khỏi hệ thống. Vui lòng xác nhận nếu bạn muốn tiếp
                        tục.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={onDestroy}>
                        Xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DestroyBtn;
