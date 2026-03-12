import IntroduceSpaLeft from "./components/IntroduceSpaLeft/IntroduceSpaLeft";
import IntroduceSpaRight from "./components/IntroduceSpaRight/IntroduceSpaRight";

function IntroduceSpa() {
    return (
        <div className="container grid grid-cols-1 gap-6 py-4 lg:grid-cols-2">
            <IntroduceSpaLeft />
            <IntroduceSpaRight />
        </div>
    );
}

export default IntroduceSpa;
