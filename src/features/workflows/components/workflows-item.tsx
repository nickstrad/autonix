"use client";

import { EntityItem } from "@/components/app/entity-item";
import type { Workflow } from "@/generated/prisma/client";
import { DYNAMIC_PATH_BUILDERS } from "@/lib/constants";
import { formatDistanceToNow, formatRelative } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRemoveWorkflow } from "../hooks/use-remove-workflow";
import { useCallback } from "react";

type WorkflowsItemProps = {
  workflow: Workflow;
};

export const WorkflowsItem = ({ workflow }: WorkflowsItemProps) => {
  const removeWorkflow = useRemoveWorkflow();
  const router = useRouter();

  const handleDelete = useCallback(
    (workflow: Workflow) => {
      removeWorkflow.mutate({ id: workflow.id });
    },
    [removeWorkflow, router]
  );

  return (
    <EntityItem
      href={DYNAMIC_PATH_BUILDERS.WORKFLOWS.detailsView(workflow.id)}
      title={workflow.name}
      subTitle={
        <div className="flex flex-col gap-2">
          <div className="mb-1 flex items-center text-sm justify-between">
            <span className="text-muted-foreground font-bold">
              Last updated:
            </span>
            {formatDistanceToNow(workflow.updatedAt, { addSuffix: true })}
          </div>
          <div className="flex items-center text-sm justify-between">
            <span className="text-muted-foreground font-bold">Created: </span>
            {formatRelative(workflow.createdAt, new Date())}
          </div>
        </div>
      }
      image={<WorkflowIcon />}
      onRemove={() => handleDelete(workflow)}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
