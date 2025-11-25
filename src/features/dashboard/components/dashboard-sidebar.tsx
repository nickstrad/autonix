"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/app/AppLogo";
import { CreditCardIcon, LogOutIcon, StarIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { PATHS } from "@/lib/constants";
import { useRouter } from "next/navigation";

const items = [
  { label: "Credentials", path: PATHS.CREDENTIALS },
  { label: "Executions", path: PATHS.EXECUTIONS },
  { label: "Workflows", path: PATHS.WORKFLOWS },
];

export function DashboardSidebar() {
  const router = useRouter();
  const { state } = useSidebar();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo width={30} height={30} />
          {state === "expanded" && (
            <span className="text-lg font-semibold">Autonix</span>
          )}
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      {state === "expanded" && (
        <>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(({ path, label }) => (
                    <SidebarMenuItem key={label}>
                      <Link href={path} passHref>
                        <SidebarMenuButton
                          isActive={isActive(path)}
                          tooltip={label}
                        >
                          <span>{label}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Billing Portal"
                  className="gap-x-4 h-10 px-4"
                  onClick={() => {}}
                >
                  <CreditCardIcon className="h-4 w-4" />
                  <span>Billing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Upgrade to Pro"
                  className="gap-x-4 h-10 px-4"
                  onClick={() => {}}
                >
                  <StarIcon className="h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Sign out"
                  className="gap-x-4 h-10 px-4"
                  onClick={() => {
                    authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push(PATHS.LOGIN);
                        },
                      },
                    });
                  }}
                >
                  <LogOutIcon className="h-4 w-4" />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}
