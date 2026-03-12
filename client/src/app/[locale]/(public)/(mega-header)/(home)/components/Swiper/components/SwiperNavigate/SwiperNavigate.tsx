import { SwiperNavButtonLeft } from "@/components/SwiperNavButtons/SwiperNavButtonLeft/SwiperNavButtonLeft";
import { SwiperNavButtonRight } from "@/components/SwiperNavButtons/SwiperNavButtonRight/SwiperNavButtonRight";

type Props = {
    swiperRef: any;
};

function SwiperNavigate({ swiperRef }: Props) {
    return (
        <>
            <SwiperNavButtonLeft
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 left-0 z-20 ml-10 hidden -translate-y-1/2 bg-(--primary-color) transition-all duration-300 ease-out hover:-translate-x-1 hover:shadow-[2px_-2px_0_#fff,2px_2px_0_#fff,4px_4px_0_#fff] md:flex lg:ml-20.75"
                iconClassName="text-[#fff]"
            />
            <SwiperNavButtonRight
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 right-0 z-20 mr-10 hidden -translate-y-1/2 bg-(--primary-color) transition-all duration-300 ease-out will-change-transform hover:translate-x-1 hover:shadow-[-2px_-2px_0_#fff,-2px_2px_0_#fff,-4px_4px_0_#fff] md:flex lg:mr-20.75"
                iconClassName="text-[#fff]"
            />
        </>
    );
}

export default SwiperNavigate;
