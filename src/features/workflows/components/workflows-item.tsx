"use client";

import { EntityItem } from "@/components/app/entity-item";
import type { Workflow } from "@/generated/prisma";
import { DYNAMIC_PATH_BUILDERS } from "@/lib/constants";
import { formatDistanceToNow, formatRelative } from "date-fns";
import { WorkflowIcon, ListIcon } from "lucide-react";
import { useRemoveWorkflow } from "../hooks/use-workflows";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type WorkflowsItemProps = {
  workflow: Workflow;
};

export const WorkflowsItem = ({ workflow }: WorkflowsItemProps) => {
  const removeWorkflow = useRemoveWorkflow();

  const handleDelete = useCallback(
    (workflow: Workflow) => {
      removeWorkflow.mutate({ id: workflow.id });
    },
    [removeWorkflow]
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
      actions={[
        <Link
          key={"executions-link"}
          href={DYNAMIC_PATH_BUILDERS.EXECUTIONS.byWorkflow(workflow.id)}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="ghost" size="icon" className="size-full">
            <ListIcon className="size-4" />
            <p>Executions</p>
          </Button>
        </Link>,
      ]}
      onRemove={() => handleDelete(workflow)}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
