import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";
import { LoadingView } from "@/components/app/loading-view";
import { ExecutionDetails } from "@/features/executions/components/execution-details";

type PageProps = {
  params: Promise<{ executionId: string }>;
};

const Page = async ({ params }: PageProps) => {
  await requireAuth();
  const { executionId } = await params;

  return (
    <div className="p-4">
      <Suspense fallback={<LoadingView />}>
        <ExecutionDetails id={executionId} />
      </Suspense>
    </div>
  );
};

export default Page;
