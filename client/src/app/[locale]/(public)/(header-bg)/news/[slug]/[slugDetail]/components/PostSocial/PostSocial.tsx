import { siteSettingService } from "@/services/siteService";
import { Facebook, Linkedin, Twitter } from "lucide-react";

async function PostSocial() {
    const res = await siteSettingService.get();

    return (
        <div className="mt-10 flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary-color)">
                <Facebook size={25} className="text-white" />
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary-color)">
                <Twitter size={25} className="text-white" />
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--primary-color)">
                <Linkedin size={25} className="text-white" />
            </div>
        </div>
    );
}

export default PostSocial;
