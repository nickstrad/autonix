import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { LogoutButton } from "./logout";

export const Home = async () => {
  await requireAuth();
  const data = await caller.getUsers();

  return (
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>
      <LogoutButton />
    </div>
  );
};

export default Home;
