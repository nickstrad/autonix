"use client";

import { EntityItem } from "@/components/app/entity-item";
import { Workflow } from "@/generated/prisma/client";
import { DYNAMIC_PATH_BUILDERS } from "@/lib/constants";
import { formatRelative } from "date-fns";
import { WorkflowIcon } from "lucide-react";

type WorkflowsItemProps = {
  workflow: Workflow;
};

export const WorkflowsItem = ({ workflow }: WorkflowsItemProps) => {
  return (
    <EntityItem
      href={DYNAMIC_PATH_BUILDERS.WORKFLOWS.detailsView(workflow.id)}
      title={workflow.name}
      subTitle={`Last updated ${formatRelative(
        workflow.updatedAt,
        new Date()
      )}`}
      image={<WorkflowIcon />}
    />
  );
};
