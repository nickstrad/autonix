"use client";

import { memo } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

export const AddNodeButton = memo(
  ({ onClick = () => {} }: { onClick?: () => void }) => {
    return (
      <Button
        size="icon"
        className="bg-background"
        onClick={onClick}
        variant="outline"
      >
        <PlusIcon />
      </Button>
    );
  }
);

AddNodeButton.displayName = "AddNodeButton";
