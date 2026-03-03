import AboutLeft from "../AboutLeft/AboutLeft";
import AboutRight from "../AboutRight/AboutRight";

function AboutData() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <AboutLeft />
            <AboutRight />
        </div>
    );
}

export default AboutData;
