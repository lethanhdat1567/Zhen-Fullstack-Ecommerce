import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props = {
    showDialog: boolean;
    disables: Date[];
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    onDestroyDisable: (id: Date) => void;
    onSubmit: () => void;
};

function DisableDialog({
    showDialog,
    disables,
    onDestroyDisable,
    setShowDialog,
    onSubmit,
}: Props) {
    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <div className="space-y-2 space-x-2">
                        {disables.map((disable) => (
                            <Badge
                                key={disable.toISOString()}
                                className="rounded-sm"
                            >
                                {disable.toLocaleDateString()}
                                <Button
                                    variant={"secondary"}
                                    className="rounded-sm"
                                    size={"icon-sm"}
                                    onClick={() => onDestroyDisable(disable)}
                                >
                                    <X />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <Button onClick={onSubmit}>Submit</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default DisableDialog;
