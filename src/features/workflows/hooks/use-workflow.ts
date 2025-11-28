import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseWorkflow = ({ id }: { id: string }) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
};
