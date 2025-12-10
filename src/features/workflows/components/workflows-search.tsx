"use client";

import { EntitySearch } from "@/components/app/entity-search";
import { ENTITIES } from "@/lib/constants";
import { useWorkflowParams } from "../hooks/use-workflows";
import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder={`Search ${ENTITIES.WORKFLOWS}...`}
    />
  );
};
