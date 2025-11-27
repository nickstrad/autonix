"use client";
import { useSuspenseWorkflows } from "../hooks/use-workflows";
import { WorkflowsEmpty } from "./workflows-empty";
import { EntityList } from "@/components/app/entity-list"; // Import EntityList
import { WorkflowsItem } from "./workflows-item";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowsItem workflow={workflow} />}
      emptyView={<WorkflowsEmpty />}
      className="p-4"
    />
  );
};
