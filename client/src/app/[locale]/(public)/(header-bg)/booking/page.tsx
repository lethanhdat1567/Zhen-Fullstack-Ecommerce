import FormBooking from "@/app/[locale]/(public)/(header-bg)/booking/FormBooking";
import AutoBanner from "@/components/Auto/AutoBanner";

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
                <FormBooking />
            </div>
        </div>
    );
}

export default BookingPage;
