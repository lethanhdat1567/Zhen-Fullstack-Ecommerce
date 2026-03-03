import QuickContactBtn from "@/app/[locale]/(public)/components/QuickContact/components/QuickContactBtn/QuickContactBtn";
import { ZaloIcon } from "@/assets/icons";
import AnimatedContent from "@/components/AnimatedContent";
import { siteSettingService } from "@/services/siteService";
import { CalendarDays, Mail, Phone } from "lucide-react";

async function QuickContact() {
    const res = await siteSettingService.get();
    const data = res;

    const phone = data?.phone_number;
    const email = data?.email;

    const telLink = phone ? `tel:${phone}` : "#";
    const mailLink = email ? `mailto:${email}` : "#";
    const zaloLink = phone ? `https://zalo.me/${phone}` : "#";

    return (
        <div className="fixed right-8 bottom-90 z-50 hidden lg:flex">
            <AnimatedContent
                direction="horizontal"
                className="flex h-50 w-10 flex-col gap-4"
            >
                {/* Phone */}
                <QuickContactBtn as="a" href={telLink}>
                    <Phone color="white" />
                </QuickContactBtn>

                {/* Email */}
                <QuickContactBtn as="a" href={mailLink}>
                    <Mail color="white" />
                </QuickContactBtn>

                {/* Booking (KHÔNG link theo yêu cầu) */}
                <QuickContactBtn className="min-h-auto py-4">
                    <div className="flex flex-col items-center gap-4 text-xs font-semibold tracking-wide">
                        <CalendarDays className="h-5 w-5" />
                        <span className="text-xl font-normal [writing-mode:vertical-lr]">
                            Booking service
                        </span>
                    </div>
                </QuickContactBtn>

                {/* Phone Ping */}
                <a
                    href={telLink}
                    className="relative flex h-14 w-14 items-center justify-center"
                >
                    <span className="absolute inset-0 animate-[ping_2s_ease-out_infinite] rounded-full bg-green-400 opacity-60" />
                    <div className="relative z-10 flex h-14 w-14 animate-[strong-shake_2s_linear_infinite] items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95">
                        <Phone className="h-5 w-5" />
                    </div>
                </a>

                {/* Zalo Ping */}
                <a
                    href={zaloLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-14 w-14 items-center justify-center"
                >
                    <span className="absolute inset-0 animate-[ping_2s_ease-out_infinite] rounded-full bg-blue-400 opacity-60 [animation-delay:0.5s]" />
                    <div className="relative z-10 flex h-14 w-14 animate-[strong-shake_2s_linear_infinite] items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform duration-300 [animation-delay:0.5s] hover:scale-105 active:scale-95">
                        {ZaloIcon}
                    </div>
                </a>
            </AnimatedContent>
        </div>
    );
}

export default QuickContact;
