import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type PrefetchWorkflowsInput = inferInput<typeof trpc.workflows.getMany>;

export async function prefetchWorkflows(input: PrefetchWorkflowsInput) {
  return prefetch(trpc.workflows.getMany.queryOptions(input));
}

type PrefetchWorkflowInput = inferInput<typeof trpc.workflows.getOne>;

export async function prefetchWorkflow(input: PrefetchWorkflowInput) {
  return prefetch(trpc.workflows.getOne.queryOptions(input));
}
