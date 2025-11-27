"use client";

import type { Entity } from "@/lib/constants";
import { FileIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import type { StateViewProps } from "./loading-view";

interface EmptyViewProps extends StateViewProps {
  entity?: Entity;
  onNew?: () => void;
}

export const EmptyView = ({ message, entity, onNew }: EmptyViewProps) => {
  const title = message ?? "No results";

  let description = "There's nothing here yet.";
  if (entity && onNew) {
    description = `Get started by creating a new ${entity}.`;
  } else if (entity) {
    description = `There are currently no ${entity}s to display.`;
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>
            {entity ? `New ${entity}` : "Add item"}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};
