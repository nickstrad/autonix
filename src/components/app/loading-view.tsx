"use client";

import { Loader2Icon } from "lucide-react";

export type StateViewProps = {
  message?: string;
};

export const LoadingView = ({ message = "Loading..." }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Loader2Icon className="size-6 animate-spin" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};
