"use client";

import { NodeProps, useReactFlow, type Node } from "@xyflow/react";
import { useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { useNodeStatus } from "../../hooks/use-node-status";
import { AIProviderDialog, AIProviderFormValues } from "./dialogs";
import { fetchAIProviderRealtimeToken } from "./actions";
import { BaseExecutionNode } from "../base-execution-node";
import { AIProvider } from "@/lib/constants";
import { getAIProviderConfig } from "@/lib/constants";

export type AIProviderNodeData = {
  variableName: string;
  prompt: string;
};

type AIProviderNodeProps = Node<AIProviderNodeData>;

export const getAIProviderNode = (provider: AIProvider) => {
  const AIProviderNode = (props: NodeProps<AIProviderNodeProps>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();

    const providerConfig = getAIProviderConfig(provider);

    const nodeStatus = useNodeStatus({
      nodeId: props.id,
      topic: "status",
      channel: providerConfig.channel,
      refreshToken: () => fetchAIProviderRealtimeToken(provider),
    });

    const nodeData = props.data;
    const description =
      nodeData.prompt && nodeData.variableName ? (
        <div>
          <Separator className="my-1" />

          <div>{nodeData.variableName}</div>
          <div className="truncate">{nodeData.prompt}</div>
        </div>
      ) : (
        "Not configured"
      );

    const handleOpenSettings = () => {
      setDialogOpen(true);
    };

    const handleSubmit = useCallback(
      (values: AIProviderFormValues) => {
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
      },
      [props.id, setNodes]
    );

    return (
      <>
        <AIProviderDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleSubmit}
          defaultValues={nodeData}
          providerName={providerConfig.label}
        />
        <BaseExecutionNode
          {...props}
          id={props.id}
          icon={providerConfig.icon}
          name={providerConfig.label}
          status={nodeStatus}
          description={description}
          onSettings={handleOpenSettings}
          onDoubleClick={handleOpenSettings}
        />
      </>
    );
  };

  AIProviderNode.displayName = `AIProviderNode(${provider})`;
  return AIProviderNode;
};
