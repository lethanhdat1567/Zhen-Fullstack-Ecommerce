import ItemLeft from "./components/ItemLeft/ItemLeft";
import ItemRight from "./components/ItemRight/ItemRight";

function AboutRight() {
    return (
        <div className="mt-6 grid grid-cols-2 gap-2.5 lg:mt-0">
            <ItemLeft />
            <ItemRight />
        </div>
    );
}

export default AboutRight;
