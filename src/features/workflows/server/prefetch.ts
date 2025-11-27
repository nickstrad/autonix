import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getMany>;

export async function prefetchWorkflows(input?: Input) {
  return prefetch(trpc.workflows.getMany.queryOptions(input));
}
