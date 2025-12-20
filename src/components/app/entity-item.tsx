"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ItemActions } from "@/components/ui/item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export type EntityItemProps = {
  href: string;
  title: string;
  subTitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode[];
  onRemove?: () => void;
  isRemoving?: boolean;
  className?: string;
};

export function EntityItem({
  href,
  title,
  subTitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation

    if (!onRemove || isRemoving) {
      return;
    }

    onRemove();
  };

  return (
    <Card
      className={cn(
        "group/item relative flex h-full flex-col justify-between transition-colors hover:bg-accent/50",
        className
      )}
    >
      <Link href={href} className="flex flex-1 flex-col">
        <CardHeader>
          <div className="flex flex-row justify-start items-center gap-4">
            {image && <CardContent>{image}</CardContent>}

            <CardTitle>{title}</CardTitle>
          </div>
          {subTitle && <CardDescription>{subTitle}</CardDescription>}
        </CardHeader>
      </Link>
      {(actions || onRemove) && (
        <ItemActions className="absolute top-4 right-4 z-10">
          {onRemove && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions?.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {action}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleRemove}
                  disabled={isRemoving}
                >
                  {isRemoving ? (
                    <Spinner className="mr-2 size-4" />
                  ) : (
                    <Trash2 className="mr-2 size-4" />
                  )}
                  <span>Remove</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </ItemActions>
      )}
    </Card>
  );
}
