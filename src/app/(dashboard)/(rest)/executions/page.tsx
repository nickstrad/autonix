import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";
import { LoadingView } from "@/components/app/loading-view";
import { ExecutionsList } from "@/features/executions/components/executions-list";

const Page = async () => {
  await requireAuth();

  return (
    <div className="p-4">
      <Suspense fallback={<LoadingView />}>
        <ExecutionsList />
      </Suspense>
    </div>
  );
};

export default Page;
