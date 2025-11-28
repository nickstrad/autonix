import React from "react";
import { NavBar } from "@/features/auth/components/nav-bar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
