"use client";
import { EntityHeader } from "@/components/app/entity-header";
import { useCreateWorkflow } from "../hooks/use-workflows";
import { DYNAMIC_PATH_BUILDERS, ENTITIES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { capitalize } from "lodash-es";

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(DYNAMIC_PATH_BUILDERS.WORKFLOWS.detailsView(data.id));
      },
      onError: handleError,
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title={capitalize(ENTITIES.WORKFLOWS)}
        description={`Create and manager your ${ENTITIES.WORKFLOWS}`}
        onNew={handleCreate}
        newButtonLabel={`New ${ENTITIES.WORKFLOW}`}
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};
