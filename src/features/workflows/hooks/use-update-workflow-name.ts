import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateWorkflowName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: async (data) => {
        toast.success(`Workflow name "${data.name}" updated`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Failed to update workflow : ${error.message}`);
      },
    })
  );
};
