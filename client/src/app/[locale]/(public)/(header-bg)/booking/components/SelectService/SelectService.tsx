"use client";

import { FieldError } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Service, serviceService } from "@/services/service";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

type SelectServiceType = {
    id: string;
    name: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
};

function SelectService({ value, onChange }: Props) {
    const [services, setServices] = useState([]);
    const locale = useLocale();

    const fetchServices = async () => {
        try {
            const res = await serviceService.listServices({
                isActive: true,
                lang: locale,
            });

            const result = res.items.map((item: Service) => ({
                id: item.id,
                name: item.title,
            }));

            setServices(result as any);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchServices();
    }, []);

    if (!services.length) return null;

    return (
        <div>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Dịnh vụ" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {services.map((service: SelectServiceType) => (
                            <SelectItem key={service.id} value={service.id}>
                                {service.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default SelectService;
