"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { StripeTriggerNodeDialog } from "./dialog";
import { fetchStripeTriggerNodeRealtimeToken } from "./actions";
import { INNGEST_CHANNELS } from "@/lib/constants";

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    topic: "status",
    channel: INNGEST_CHANNELS.STRIPE_TRIGGER,
    refreshToken: fetchStripeTriggerNodeRealtimeToken,
  });

  return (
    <>
      <StripeTriggerNodeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/stripe.svg"
        name="Stripe"
        description="When stripe event is captured"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

StripeTriggerNode.displayName = "StripeTriggerNode";
