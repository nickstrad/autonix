"use client";

import { memo, useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { NodeSelector } from "./node-selector";

export const AddNodeButton = memo(
  ({ onClick = () => {} }: { onClick?: () => void }) => {
    const [selectorOpen, setSelectorOpen] = useState(false);
    return (
      <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
        <Button
          size="icon"
          className="bg-background"
          onClick={onClick}
          variant="outline"
        >
          <PlusIcon />
        </Button>
      </NodeSelector>
    );
  }
);

AddNodeButton.displayName = "AddNodeButton";
