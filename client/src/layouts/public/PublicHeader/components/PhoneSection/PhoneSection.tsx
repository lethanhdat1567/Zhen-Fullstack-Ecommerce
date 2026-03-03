"use client";

import { siteSettingService } from "@/services/siteService";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

function PhoneSection() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const fetchNumber = async () => {
        try {
            const response = await siteSettingService.get();
            setPhoneNumber(response.phone_number || "");
        } catch (error) {
            console.error("Error fetching phone number:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNumber();
    }, []);

    if (!phoneNumber) return null;

    return (
        <div className="hidden items-center gap-1 text-sm font-semibold text-(--primary-color) md:flex">
            <Phone size={16} />+{phoneNumber}
        </div>
    );
}

export default PhoneSection;
