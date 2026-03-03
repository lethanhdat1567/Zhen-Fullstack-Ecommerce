import { TextAlignJustify, X } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import HomeBtn from "@/layouts/public/PublicHeader/components/HomeBtn/HomeBtn";
import Navbar from "@/layouts/public/PublicHeader/components/Navbar/Navbar";
import NavInfomation from "@/layouts/public/PublicHeader/components/NavInfomation/NavInfomation";
import { useState } from "react";

function Sidebar() {
    const [isShow, setIsShow] = useState(false);

    return (
        <Drawer direction="right" open={isShow} onOpenChange={setIsShow}>
            <DrawerTrigger asChild>
                <button className="ml-5 flex items-center justify-center rounded-tr-xl rounded-bl-xl border border-white bg-(--primary-color) p-3 shadow-[0_0_10px_#8D388A] lg:hidden">
                    <TextAlignJustify size={18} color="white" />
                </button>
            </DrawerTrigger>
            <DrawerContent className="h-screen shadow-[0_0_30px_#8D388A]">
                <DrawerTitle hidden>Are you absolutely sure?</DrawerTitle>
                <button
                    className="mt-5 mr-5 ml-auto flex items-center justify-center rounded-tr-xl rounded-bl-xl border border-white bg-(--primary-color) p-3 shadow-[0_0_10px_#8D388A]"
                    onClick={() => setIsShow(false)}
                >
                    <X size={18} color="white" />
                </button>
                {/* Content */}
                <div className="h-full overflow-x-hidden overflow-y-auto p-5">
                    <HomeBtn />
                    <Navbar onClick={() => setIsShow(false)} />
                    <NavInfomation onClick={() => setIsShow(false)} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default Sidebar;
