"use client";
import { AlertTriangleIcon } from "lucide-react";
import { StateViewProps } from "./loading-view";

export const ErrorView = ({ message = "Error" }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <AlertTriangleIcon className="size-6 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};
