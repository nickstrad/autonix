import { memo } from "react";
import { PlaceholderNode } from "../react-flow/placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkflowNode } from "./workflow-node";

export const InitialNode = memo((props) => {
  return (
    <WorkflowNode>
      <PlaceholderNode {...props} onClick={() => {}}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});
