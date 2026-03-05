import PublicFooter from "@/layouts/public/PublicFooter/PublicFooter";
import PublicHeader from "@/layouts/public/PublicHeader/PublicHeader";

function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <PublicHeader />
            <div className="mt-34 flex-1">{children}</div>
            <PublicFooter />
        </div>
    );
}

export default PublicLayout;
