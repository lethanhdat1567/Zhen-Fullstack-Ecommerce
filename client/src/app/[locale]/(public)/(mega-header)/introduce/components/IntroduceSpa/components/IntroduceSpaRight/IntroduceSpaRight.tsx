import ItemLeft from "./components/ItemLeft/ItemLeft";
import ItemRight from "./components/ItemRight/ItemRight";

function IntroduceSpaRight() {
    return (
        <div className="grid grid-cols-2 gap-2.5">
            <ItemLeft />
            <ItemRight />
        </div>
    );
}

export default IntroduceSpaRight;
