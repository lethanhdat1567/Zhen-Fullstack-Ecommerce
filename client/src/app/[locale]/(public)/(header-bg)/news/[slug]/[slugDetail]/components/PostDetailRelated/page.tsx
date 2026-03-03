import { images } from "@/assets/images";
import Image from "next/image";

function PostDetailRelated({ postRelated }: { postRelated: any }) {
    return (
        <div className="container">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-[50px] font-light text-(--primary-color)">
                    Tin tức liên quan
                </h2>

                <Image
                    src={images.lotus}
                    width={116}
                    height={25}
                    alt=""
                    className="mt-3.75 mb-10"
                />
            </div>
        </div>
    );
}

export default PostDetailRelated;
