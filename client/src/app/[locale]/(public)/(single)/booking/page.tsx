import FormBooking from "@/app/[locale]/(public)/(single)/booking/FormBooking";
import AutoBanner from "@/components/Auto/AutoBanner";
import { Card, CardContent } from "@/components/ui/card";

function BookingPage() {
    return (
        <div className="pt-4 pb-8">
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Đặt phòng",
                        href: "/booking",
                    },
                ]}
                hideBanner
            />
            <div className="container">
                <Card>
                    <CardContent>
                        <FormBooking />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default BookingPage;
