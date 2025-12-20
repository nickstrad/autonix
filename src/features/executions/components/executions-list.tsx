"use client";
import {
  useSuspenseExecutions,
  useExecutionParams,
} from "../hooks/use-executions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExecutionStatus } from "@/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { EntityPagination } from "@/components/app/entity-pagination";
import { ExecutionsEmpty } from "./executions-empty";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ContextViewer } from "./context-viewer";
import { StatusBadge } from "./execution-details";
import { DYNAMIC_PATH_BUILDERS } from "@/lib/constants";
import { TruncatedText } from "@/components/ui/truncated-text";

export const ExecutionsList = () => {
  const executions = useSuspenseExecutions();
  const [params, setParams] = useExecutionParams();

  const handleSort = (sortBy: string) => {
    if (params.sortBy === sortBy) {
      setParams({ sortOrder: params.sortOrder === "asc" ? "desc" : "asc" });
    } else {
      setParams({ sortBy, sortOrder: "asc" });
    }
  };

  const handleStatusChange = (status: string) => {
    setParams({ status: params.status === status ? "" : status, page: 1 });
  };

  const renderSortIcon = (column: string) => {
    if (params.sortBy !== column) {
      return null;
    }
    return params.sortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  if (executions.data.items.length === 0 && params.status === "") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Executions</CardTitle>
        </CardHeader>
        <CardContent>
          <ExecutionsEmpty />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Executions</CardTitle>
        <div className="flex items-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground font-medium">
            Filter by status:
          </span>
          <ToggleGroup
            type="single"
            variant="outline"
            value={params.status ?? ""}
            onValueChange={handleStatusChange}
            className="justify-start"
          >
            <ToggleGroupItem value={ExecutionStatus.RUNNING}>
              Running
            </ToggleGroupItem>
            <ToggleGroupItem value={ExecutionStatus.SUCCESS}>
              Success
            </ToggleGroupItem>
            <ToggleGroupItem value={ExecutionStatus.ERROR}>
              Error
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => handleSort("workflow.name")}
                >
                  Workflow {renderSortIcon("workflow.name")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => handleSort("status")}
                >
                  Status {renderSortIcon("status")}
                </Button>
              </TableHead>
              <TableHead>Error Message</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At {renderSortIcon("createdAt")}
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {executions.data.items.map((execution) => (
              <TableRow key={execution.id}>
                <TableCell>
                  <Link
                    href={DYNAMIC_PATH_BUILDERS.WORKFLOWS.detailsView(
                      execution.workflowId
                    )}
                    className="text-blue-500 hover:underline"
                  >
                    {execution.workflow.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <StatusBadge status={execution.status} />
                </TableCell>
                <TableCell>
                  <TruncatedText
                    text={execution.error || ""}
                    maxWidth="300px"
                  />
                </TableCell>
                <TableCell>
                  {new Date(execution.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/executions/${execution.id}`} passHref>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    {execution.context && (
                      <ContextViewer context={execution.context} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EntityPagination
          page={executions.data.page}
          pageSize={executions.data.pageSize}
          totalCount={executions.data.totalCount}
          totalPages={executions.data.totalPages}
          hasNextPage={executions.data.hasNextPage}
          hasPreviousPage={executions.data.hasPreviousPage}
          disabled={false}
          onPageChange={(page) => setParams({ page })}
          onPageSizeChange={(pageSize) => setParams({ pageSize, page: 1 })}
        />
      </CardContent>
    </Card>
  );
};
