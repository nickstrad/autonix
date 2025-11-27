"use client";

import { EmptyView } from "@/components/app/empty-view";
import { ENTITIES } from "@/lib/constants";

export const WorkflowsEmpty = () => {
  return <EmptyView entity={ENTITIES.WORKFLOW} />;
};
