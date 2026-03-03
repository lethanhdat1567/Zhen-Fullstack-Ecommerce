"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const pathname = usePathname();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Danh mục</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isParentActive =
                        pathname === item.url ||
                        pathname.startsWith(item.url + "/");

                    const isAnyChildActive = item.items?.some(
                        (sub) =>
                            pathname === sub.url ||
                            pathname.startsWith(sub.url + "/"),
                    );

                    const isOpen = isParentActive || isAnyChildActive;

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isOpen}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        data-active={isParentActive}
                                        className={
                                            isParentActive
                                                ? "bg-accent text-accent-foreground font-medium"
                                                : ""
                                        }
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => {
                                            const isSubActive =
                                                pathname === subItem.url;

                                            return (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        className={
                                                            isSubActive
                                                                ? "bg-accent text-accent-foreground font-medium"
                                                                : ""
                                                        }
                                                    >
                                                        <Link
                                                            href={subItem.url}
                                                        >
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
