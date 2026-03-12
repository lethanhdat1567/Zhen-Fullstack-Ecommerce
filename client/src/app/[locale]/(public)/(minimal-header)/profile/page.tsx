import Title from "@/app/admin/components/Title/Title";
import AdminForm from "@/app/admin/profile/components/AdminForm/AdminForm";
import ChangePassword from "@/app/admin/profile/components/ChangePassword/ChangePassowrd";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

async function ProfilePage() {
    const t = await getTranslations("Profile");

    return (
        <div className="mx-auto w-3xl py-10">
            <Title title={t("accountTitle")} className="mb-5" />
            <AdminForm />
            <Separator className="my-5" />
            <div>
                <Title title={t("passwordTitle")} className="mb-5" />
                <ChangePassword />
            </div>
        </div>
    );
}

export default ProfilePage;
