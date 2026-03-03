import { siteSettingService } from "@/services/siteService";

async function GoogleMap() {
    const res = await siteSettingService.get();

    let embedHtml = res.google_map_embed || "";

    // remove fixed width & height
    embedHtml = embedHtml
        .replace(/width="[^"]*"/, "")
        .replace(/height="[^"]*"/, "")
        .replace("<iframe", '<iframe class="w-full h-full"');

    return (
        <div className="h-112.5 w-full">
            <div
                className="h-full w-full"
                dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
        </div>
    );
}

export default GoogleMap;
