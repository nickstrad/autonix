"use client";

import type { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { INNGEST_CHANELS } from "@/lib/constants";
import { GoogleFormTriggerDialog } from "./dialog";
import { fetchGoogleFormTriggerRealtimeToken } from "./actions";

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenSettings = () => {
    setDialogOpen(true);
  };

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    topic: "status",
    channel: INNGEST_CHANELS.GOOGLE_FORM_TRIGGER,
    refreshToken: fetchGoogleFormTriggerRealtimeToken,
  });

  return (
    <>
      <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
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
