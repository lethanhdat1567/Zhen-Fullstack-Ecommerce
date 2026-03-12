import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

type Props = {
    type: "product" | "service";
    setType: (type: any) => void;
};

function HistoryTypeTab({ type, setType }: Props) {
    const t = useTranslations("OrderHistory.type");

    return (
        <Tabs value={type} onValueChange={setType} className="w-full">
            <TabsList>
                <TabsTrigger value="product">{t("product")}</TabsTrigger>
                <TabsTrigger value="service">{t("service")}</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default HistoryTypeTab;
