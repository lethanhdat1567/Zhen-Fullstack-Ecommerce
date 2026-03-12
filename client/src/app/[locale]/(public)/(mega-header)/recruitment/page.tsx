import { getTranslations } from "next-intl/server";
import RecruitmentBanner from "./components/RecruitmentBanner/RecruitmentBanner";
import RecruitmentItem from "./components/RecruitmentItem/RecruitmentItem";
import RecruitmentRow from "./components/RecruitmentRow/RecruitmentRow";
import { recruitmentData } from "./data";

async function RecruitmentPage() {
    const t = await getTranslations("Recruitment");
    const rawRecruitment = t.raw("contentRecruitment");

    const recruitments = rawRecruitment.map((f: any, index: number) => ({
        ...f,
        thumbnail: recruitmentData[index]?.thumbnail,
    }));

    return (
        <div className="mb-22">
            <div className="relative mb-20 h-auto w-full md:mb-120 md:h-screen xl:mb-80">
                <RecruitmentBanner />
                <div className="relative right-0 bottom-0 left-0 mt-10 md:absolute md:-bottom-120 md:mt-0 lg:-bottom-80 xl:-bottom-62.5">
                    <div className="container grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0 lg:grid-cols-4">
                        {recruitments.map((item: any, index: number) => (
                            <RecruitmentItem
                                item={item}
                                key={index}
                                isFirst={index === 0}
                                isLast={index === recruitmentData.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mb-10 flex items-center justify-center">
                <h2 className="text-[22px] font-medium uppercase sm:text-[28px] md:text-[34px] lg:text-[40px]">
                    {t("subTitle")}
                </h2>
            </div>
            <RecruitmentRow />
        </div>
    );
}

export default RecruitmentPage;
