"use client";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

export const EditorSaveButton = () => {
  return (
    <Button size="sm" type="button" onClick={() => {}}>
      <SaveIcon className="size-4" /> Save
    </Button>
  );
};
