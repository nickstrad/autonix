"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { HttpRequestFormValues, HttpRequestDialog } from "./dialog";
import { Separator } from "@/components/ui/separator";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchHttpRequestRealtimeToken } from "./actions";
import { INNGEST_CHANELS } from "@/lib/constants";

export type HttpRequestNodeData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    topic: "status",
    channel: INNGEST_CHANELS.HTTP_REQUEST,
    refreshToken: fetchHttpRequestRealtimeToken,
  });

  const nodeData = props.data;
  const description =
    nodeData.endpoint && nodeData.variableName ? (
      <div>
        <Separator className="my-1" />

        <div>{nodeData.variableName}</div>
        <div>
          {nodeData.method} {nodeData.endpoint}
        </div>
      </div>
    ) : (
      "Not configured"
    );

  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  const handleSubmit = (values: HttpRequestFormValues) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id !== props.id) {
          return n;
        }
        return {
          ...n,
          data: {
            ...n.data,
            ...values,
          },
        };
      })
    );
  };

  return (
    <>
      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
