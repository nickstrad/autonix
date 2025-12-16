import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";
import { FlaskConicalIcon } from "lucide-react";

export const ExecuteWorkflowButton = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const handleExecuteWorkflow = useExecuteWorkflow();
  const handleClick = () => {
    handleExecuteWorkflow.mutate({ id: workflowId });
  };
  return (
    <Button disabled={handleExecuteWorkflow.isPending} onClick={handleClick}>
      <FlaskConicalIcon className="size-4" /> Execute Workflow
    </Button>
  );
};
