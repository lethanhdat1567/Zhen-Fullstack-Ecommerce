import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    onConfirm: () => void;
    loading?: boolean;
}

function DestroyAlertDialog({
    open,
    onOpenChange,
    title = "Bạn có chắc chắn muốn xóa?",
    description = "Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn khỏi hệ thống.",
    onConfirm,
    loading = false,
}: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={loading}
                        onClick={() => onOpenChange(false)}
                    >
                        Hủy
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? "Đang xóa..." : "Xóa"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DestroyAlertDialog;
