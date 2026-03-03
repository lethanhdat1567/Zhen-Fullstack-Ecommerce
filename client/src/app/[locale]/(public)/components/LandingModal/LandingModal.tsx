"use client";

import LandingItem from "@/app/[locale]/(public)/components/LandingModal/LandingItem";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Popup, popupService } from "@/services/popupService";
import { useEffect, useState } from "react";

const STORAGE_KEY = "landing_popup_shown";

function LandingModal() {
    const [showModal, setShowModal] = useState(false);
    const [modals, setModals] = useState<Popup[]>([]);

    const fetchModals = async () => {
        try {
            const res = await popupService.list({
                lang: "vi",
                status: "active",
            });

            setModals(res.items);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const shown = sessionStorage.getItem("landing_popup_shown");

        if (!shown) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchModals();
            setShowModal(true);
            sessionStorage.setItem("landing_popup_shown", "true");
        } else {
            setShowModal(false);
        }
    }, []);

    if (modals.length === 0) return null;

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent
                className="max-h-[90vh] min-w-[60vw]! overflow-y-auto"
                data-lenis-prevent
            >
                <DialogTitle className="hidden">
                    Chào mừng bạn đến với [Tên thương hiệu]
                </DialogTitle>

                <div className="h-full overflow-y-auto">
                    {modals.map((item) => (
                        <LandingItem key={item.id} item={item} />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default LandingModal;
