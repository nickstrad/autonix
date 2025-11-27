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

export type EntityItemProps = {
  href: string;
  title: string;
  subTitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
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
  className,
}: EntityItemProps) {
  return (
    <Card
      className={cn(
        "group/item relative flex h-full flex-col justify-between transition-colors hover:bg-accent/50",
        className
      )}
    >
      <Link href={href} className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {subTitle && <CardDescription>{subTitle}</CardDescription>}
        </CardHeader>
        {image && <CardContent>{image}</CardContent>}
      </Link>
      {actions && (
        <ItemActions className="absolute top-4 right-4 z-10">
          {actions}
        </ItemActions>
      )}
    </Card>
  );
}
