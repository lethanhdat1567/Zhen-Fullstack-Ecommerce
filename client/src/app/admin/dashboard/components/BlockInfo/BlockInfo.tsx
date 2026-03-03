interface BlockInfoProps {
    title: string;
    value: number;
}

function BlockInfo({ title, value }: BlockInfoProps) {
    return (
        <div className="group bg-background relative w-full border p-6 shadow-sm transition hover:shadow-md">
            <div className="text-md text-muted-foreground font-medium">
                {title}
            </div>

            <div className="mt-4">
                <h3 className="text-foreground text-5xl font-semibold tracking-tight">
                    +{value.toLocaleString()}
                </h3>
            </div>
        </div>
    );
}

export default BlockInfo;
