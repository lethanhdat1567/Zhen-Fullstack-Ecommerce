import HeroImages from "@/app/admin/settings/general/components/HeroImages/HeroImages";
import NavsSetting from "@/app/admin/settings/general/components/NavsSetting/NavsSetting";
import SEO from "@/app/admin/settings/general/components/SEO/SEO";
import UploadLogo from "@/app/admin/settings/general/components/UploadLogo/UploadLogo";
import { Separator } from "@/components/ui/separator";

function GeneralPage() {
    return (
        <div className="mx-auto w-3xl">
            <UploadLogo />
            <Separator />
            <HeroImages />
            <Separator className="my-5" />
            <NavsSetting />
            <Separator className="my-5" />
            <SEO />
        </div>
    );
}

export default GeneralPage;
