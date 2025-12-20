import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EXECUTIONS_PARAMS } from "../params";
import { useQueryStates } from "nuqs";

export const useExecutionParams = () => {
  return useQueryStates(EXECUTIONS_PARAMS);
};

export const useSuspenseExecutions = () => {
  const trpc = useTRPC();
  const [params] = useExecutionParams();

  return useSuspenseQuery(trpc.executions.getMany.queryOptions(params));
};

export const useSuspenseExecution = ({ id }: { id: string }) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.executions.getOne.queryOptions({ id }));
};
