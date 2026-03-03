"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
    activeLang: string;
    onChange: (value: string) => void;
}

function TabsTranslate({ activeLang, onChange }: Props) {
    return (
        <Tabs value={activeLang} onValueChange={onChange}>
            <TabsList>
                <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">Français</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default TabsTranslate;
