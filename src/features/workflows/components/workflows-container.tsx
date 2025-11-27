"use client";
import { EntityContainer } from "@/components/app/entity-container";
import { WorkflowsHeader } from "./workflows-header";
import { WorkflowsSearch } from "./workflows-search";
import { WorkflowsPagination } from "./workflows-pagination";

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
