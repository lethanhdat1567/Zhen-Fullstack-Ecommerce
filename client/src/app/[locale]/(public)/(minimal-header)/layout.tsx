import PublicFooter from "@/layouts/public/PublicFooter/PublicFooter";
import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PublicHeader isSingle />
            <div className="mt-[calc(var(--header-height)+26px)] flex-1">
                {children}
            </div>
            <PublicFooter />
        </div>
    );
}

export default PublicLayout;
