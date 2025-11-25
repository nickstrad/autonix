import { requireAuth } from "@/lib/auth-utils";

export default async function DashboardPage() {
  await requireAuth();

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
    </div>
  );
}
