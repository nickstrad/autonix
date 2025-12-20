"use client";

import { useWorkflowParams } from "../hooks/use-workflows";
import { EntityPagination } from "@/components/app/entity-pagination";
import { useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsPagination = () => {
  const [, setParams] = useWorkflowParams();
  const workflows = useSuspenseWorkflows();
  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalCount={workflows.data.totalCount}
      totalPages={workflows.data.totalPages}
      hasNextPage={workflows.data.hasNextPage}
      hasPreviousPage={workflows.data.hasPreviousPage}
      page={workflows.data.page}
      pageSize={workflows.data.pageSize}
      onPageChange={(page) => setParams((prev) => ({ ...prev, page }))}
      onPageSizeChange={(pageSize) =>
        setParams((prev) => ({ ...prev, pageSize }))
      }
    />
  );
};
