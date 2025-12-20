import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileSearchIcon } from "lucide-react";

export const ExecutionsEmpty = () => {
  return (
    <Empty>
      <EmptyMedia>
        <FileSearchIcon />
      </EmptyMedia>
      <EmptyContent>
        <EmptyTitle>No executions found</EmptyTitle>
        <EmptyDescription>
          There are no workflow executions to display.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};
