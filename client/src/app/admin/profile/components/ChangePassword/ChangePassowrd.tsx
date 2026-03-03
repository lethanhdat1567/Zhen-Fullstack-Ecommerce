"use client";

import ChangePasswordForm from "@/app/admin/profile/components/ChangePassword/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ChangePassword() {
    const [isChange, setIsChange] = useState(false);

    return (
        <div>
            {isChange && (
                <ChangePasswordForm onCancel={() => setIsChange(false)} />
            )}

            {!isChange && (
                <Button onClick={() => setIsChange(true)}>Đổi mật khẩu</Button>
            )}
        </div>
    );
}

export default ChangePassword;
