import { Switch } from "@/components/ui/switch";

function ToggleStatus({
    status,
    onToggle,
}: {
    status: string;
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <Switch checked={status === "active"} onClick={onToggle} />
            {status}
        </div>
    );
}

export default ToggleStatus;
