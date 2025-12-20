"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JsonValue } from "@prisma/client/runtime/library";

export const ContextViewer = ({ context }: { context: JsonValue }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Context
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Execution Context</DialogTitle>
        </DialogHeader>
        <pre className="mt-2 w-full overflow-auto rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(context, null, 2)}</code>
        </pre>
      </DialogContent>
    </Dialog>
  );
};
