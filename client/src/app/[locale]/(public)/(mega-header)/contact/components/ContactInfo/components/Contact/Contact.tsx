import { getTranslations } from "next-intl/server";
import ContactForm from "./components/ContactForm/ContactForm";

async function Contact() {
    const t = await getTranslations("Contact");
    return (
        <div className="mt-6 px-0 lg:mt-0 lg:p-6">
            {/* Title */}
            <h3 className="text-xl font-semibold text-[#333333] md:text-2xl lg:text-[26px]">
                {t("formTitle")}
            </h3>

            {/* Description */}
            <div className="mt-2 mb-6 text-sm text-gray-600 md:text-base">
                {t("formDesc")}
            </div>

            <ContactForm />
        </div>
    );
}

export default Contact;
