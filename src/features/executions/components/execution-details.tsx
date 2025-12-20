"use client";

import { useSuspenseExecution } from "../hooks/use-executions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExecutionStatus } from "@/generated/prisma";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { ContextViewer } from "./context-viewer";
import { DYNAMIC_PATH_BUILDERS } from "@/lib/constants";

export const StatusBadge = ({ status }: { status: ExecutionStatus }) => {
  if (status === "SUCCESS") {
    return (
      <Badge
        variant="default"
        className="bg-green-500 hover:bg-green-500/90 text-white"
      >
        SUCCESS
      </Badge>
    );
  }
  if (status === "RUNNING") {
    return (
      <Badge
        variant="secondary"
        className="bg-blue-500 hover:bg-blue-500/90 text-white"
      >
        RUNNING
      </Badge>
    );
  }
  return <Badge variant="destructive">ERROR</Badge>;
};

export const ExecutionDetails = ({ id }: { id: string }) => {
  const { data: execution } = useSuspenseExecution({ id });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Execution Details</CardTitle>
          <div className="flex gap-2 items-center">
            {execution.context && <ContextViewer context={execution.context} />}
          </div>
        </div>
        <CardDescription>{execution.id}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-between">
          <strong>Workflow:</strong>
          <Link
            href={DYNAMIC_PATH_BUILDERS.WORKFLOWS.detailsView(
              execution.workflowId
            )}
            className="text-blue-500 hover:underline"
          >
            {execution.workflow.name}
          </Link>
        </div>
        <div className="flex justify-between">
          <strong>Status:</strong>
          <StatusBadge status={execution.status} />
        </div>
        <div className="flex justify-between">
          <strong>Created At:</strong>
          <span>{new Date(execution.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <strong>Last Updated:</strong>
          <span>{new Date(execution.updatedAt).toLocaleString()}</span>
        </div>
        {execution.error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <pre className="whitespace-pre-wrap">{execution.error}</pre>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
