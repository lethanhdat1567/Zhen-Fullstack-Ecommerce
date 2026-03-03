import { SiteSetting } from "@/services/siteService";
import { Map, Phone, Mail, Clock9 } from "lucide-react";

interface IProps {
    footer: SiteSetting;
}

function FooterCompanyInfo({ footer }: IProps) {
    return (
        <div className="w-full">
            {/* Title */}
            <h3 className="mb-6 text-lg font-semibold">
                SEN SPA SERVICE COMPANY LIMITED
            </h3>

            <div className="space-y-5 text-sm">
                {/* Address */}
                {footer?.address && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-3 text-gray-300 sm:min-w-[130px]">
                            <Map size={18} />
                            <span className="font-medium text-white">
                                Address:
                            </span>
                        </div>
                        <p className="text-white/80">{footer.address}</p>
                    </div>
                )}

                {/* Phone */}
                {footer?.phone_number && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-3 text-gray-300 sm:min-w-[130px]">
                            <Phone size={18} />
                            <span className="font-medium text-white">
                                Phone:
                            </span>
                        </div>
                        <a
                            href={`tel:${footer.phone_number}`}
                            className="text-white/80 transition hover:text-white"
                        >
                            {footer.phone_number}
                        </a>
                    </div>
                )}

                {/* Email */}
                {footer?.email && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-3 text-gray-300 sm:min-w-[130px]">
                            <Mail size={18} />
                            <span className="font-medium text-white">
                                Email:
                            </span>
                        </div>
                        <a
                            href={`mailto:${footer.email}`}
                            className="text-white/80 transition hover:text-white"
                        >
                            {footer.email}
                        </a>
                    </div>
                )}

                {/* Opening Time */}
                {footer?.open_time && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-3 text-gray-300 sm:min-w-32.5">
                            <Clock9 size={18} />
                            <span className="font-medium text-white">
                                Opening time:
                            </span>
                        </div>
                        <p className="text-white/80">{footer.open_time}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FooterCompanyInfo;
