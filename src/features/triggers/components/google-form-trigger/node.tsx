"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { GoogleFormTriggerNodeDialog } from "./dialog";
import { fetchGoogleFormTriggerNodeRealtimeToken } from "./actions";
import { INNGEST_CHANNELS } from "@/lib/constants";

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    topic: "status",
    channel: INNGEST_CHANNELS.GOOGLE_FORM_TRIGGER,
    refreshToken: fetchGoogleFormTriggerNodeRealtimeToken,
  });

  return (
    <>
      <GoogleFormTriggerNodeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <BaseTriggerNode
        {...props}
        icon="/logos/googleform.svg"
        name="Google Form"
        description="When form is submitted"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
