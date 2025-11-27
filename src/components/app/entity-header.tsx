import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PlusIcon } from "lucide-react";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { newButtonHref?: never; onNew?: never }
);

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
      </div>
      {newButtonLabel && (
        <div className="flex items-center gap-2">
          {isCreating && <Spinner />}
          {newButtonHref && !onNew && (
            <Button asChild disabled={disabled || isCreating} size="sm">
              <Link href={newButtonHref} prefetch>
                {newButtonLabel}
              </Link>
            </Button>
          )}
          {onNew && !newButtonHref && (
            <Button size="sm" onClick={onNew} disabled={disabled || isCreating}>
              <PlusIcon className="size-4" />
              {newButtonLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
