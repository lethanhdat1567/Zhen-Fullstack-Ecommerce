"use client";

import ChangePasswordForm from "@/app/admin/profile/components/ChangePassword/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";

function ChangePassword() {
    const t = useTranslations("Profile");
    const [isChange, setIsChange] = useState(false);

    return (
        <div>
            {isChange && (
                <ChangePasswordForm onCancel={() => setIsChange(false)} />
            )}

            {!isChange && (
                <Button onClick={() => setIsChange(true)}>
                    {t("password.changeBtn")}
                </Button>
            )}
        </div>
    );
}

export default ChangePassword;
