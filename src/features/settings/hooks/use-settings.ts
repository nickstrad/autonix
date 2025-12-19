import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetSettings = () => {
  const trpc = useTRPC();
  return useQuery(trpc.settings.get.queryOptions());
};

export const useUpdateSettings = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.settings.update.mutationOptions({
      onSuccess: () => {
        toast.success(`Settings updated successfully`);
        queryClient.invalidateQueries(trpc.settings.get.queryOptions());
      },
      onError: (error) => {
        toast.error(`Failed to save settings: ${error.message}`);
      },
    })
  );
};
