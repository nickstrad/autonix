"use client";
import { ErrorView } from "@/components/app/error-view";
import { ENTITIES } from "@/lib/constants";

export const WorkflowsError: React.FC = () => {
  return <ErrorView message={`Error loading ${ENTITIES.WORKFLOWS}...`} />;
};
