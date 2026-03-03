import Title from "@/app/admin/components/Title/Title";
import AdminForm from "@/app/admin/profile/components/AdminForm/AdminForm";
import ChangePassword from "@/app/admin/profile/components/ChangePassword/ChangePassowrd";
import { Separator } from "@/components/ui/separator";

function ProfilePage() {
    return (
        <div className="mx-auto w-3xl">
            <Title title="Quản lý tài khoản" className="mb-5" />
            <AdminForm />
            <Separator className="my-5" />
            <div>
                <Title title="Quản lý mật khẩu" className="mb-5" />
                <ChangePassword />
            </div>
        </div>
    );
}

export default ProfilePage;
