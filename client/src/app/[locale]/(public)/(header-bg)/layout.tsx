import PublicFooter from "@/layouts/public/PublicFooter/PublicFooter";
import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
        // className="flex h-screen flex-col overflow-x-hidden overflow-y-auto bg-(--background-color) text-(--text-color)"
        >
            <PublicHeader isBg />
            <div className="mt-25 flex-1">{children}</div>
            <PublicFooter />
        </div>
    );
}

export default PublicLayout;
