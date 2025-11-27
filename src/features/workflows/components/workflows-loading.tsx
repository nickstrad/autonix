"use client";

import { LoadingView } from "@/components/app/loading-view";
import { ENTITIES } from "@/lib/constants";

export const WorkflowsLoading: React.FC = () => {
  return <LoadingView message={`Loading ${ENTITIES.WORKFLOWS}...`} />;
};
