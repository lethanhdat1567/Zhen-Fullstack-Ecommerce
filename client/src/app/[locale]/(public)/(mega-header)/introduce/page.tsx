import AutoBanner from "@/components/Auto/AutoBanner";
import IntroduceSpa from "./components/IntroduceSpa/IntroduceSpa";
import IntroduceHistory from "./components/IntroduceHistory/IntroduceHistory";
import IntroduceConcept from "./components/IntroduceConcept/IntroduceConcept";
import IntroduceFacilities from "./components/IntroduceFacilities/IntroduceFacilities";
import styles from "./Introduce.module.scss";
import { cn } from "@/lib/utils";

function IntroducePage() {
    return (
        <div className={cn("mb-20", styles.wrapper)}>
            <AutoBanner
                breadcrumbData={[
                    {
                        title: "Giới thiệu",
                        href: "/introduce",
                    },
                ]}
            />

            <IntroduceSpa />
            <IntroduceHistory />

            {/* <IntroduceVideo /> */}
            <div className="container">
                <IntroduceConcept />
            </div>
            <IntroduceFacilities />
            {/* <div className="container">
                <IntroduceAward />
            </div> */}
        </div>
    );
}

export default IntroducePage;
