"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";

export const Home = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );
  const testAI = useMutation(
    trpc.testAI.mutationOptions({
      onSuccess: (data) => {
        toast(testAI?.data?.message ?? "AI Test Successful");
      },
    })
  );

  return (
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>
        Test AI
      </Button>
      {testAI.data && (
        <div>AI Response: {JSON.stringify(testAI.data, null, 2)}</div>
      )}
    </div>
  );
};

export default Home;
