import React from "react";
import { UpgradeModal } from "@/components/app/upgrade-modal";
import { ERRORS } from "@/lib/constants";
import { TRPCClientError } from "@trpc/client";

export const useUpgradeModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === ERRORS.FORBIDDEN.code) {
        setOpen(true);
        return true;
      }
    }
    return false;
  };

  const modal = <UpgradeModal open={open} onOpenChange={setOpen} />;
  return { handleError, modal };
};
