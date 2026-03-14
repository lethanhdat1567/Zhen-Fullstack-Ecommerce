"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { siteSettingService } from "@/services/siteService";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

function PhoneSection() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchNumber = async () => {
        try {
            const response = await siteSettingService.get();
            setPhoneNumber(response.phone_number || "");
        } catch (error) {
            console.error("Error fetching phone number:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNumber();
    }, []);

    return (
        <div className="hidden items-center gap-1 text-sm font-semibold text-(--primary-color) lg:flex">
            {loading ? (
                <Skeleton className="h-8 w-50" />
            ) : (
                <>
                    Hotline: <Phone size={16} />+{phoneNumber}
                </>
            )}
        </div>
    );
}

export default PhoneSection;
