"use client";
import { ErrorView } from "@/components/app/error-view";
import { LoadingView } from "@/components/app/loading-view";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflow";
import { ENTITIES } from "@/lib/constants";

export const EditorLoading = ({ workflowId }: { workflowId?: string }) => {
  return (
    <LoadingView
      message={`Loading editor for ${ENTITIES.WORKFLOW} ${workflowId}...`}
    />
  );
};

export const EditorError = ({ workflowId }: { workflowId?: string }) => {
  return (
    <ErrorView
      message={`Error loading editor for ${ENTITIES.WORKFLOW} ${workflowId}...`}
    />
  );
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const workflow = useSuspenseWorkflow({ id: workflowId });

  return <div>{JSON.stringify(workflow, null, 2)}</div>;
};
