"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ENTITIES, STATIC_PATHS } from "@/lib/constants";
import Link from "next/link";
import { Fragment } from "react";
import { EditorNameForm } from "./editor-name-form";

interface EditorBreadcrumbsProps {
  workflowId: string;
}

type BreadcrumbItemType = {
  label: string;
  href: string;
};

export function EditorBreadcrumbs({ workflowId }: EditorBreadcrumbsProps) {
  const breadcrumbs: BreadcrumbItemType[] = [
    { label: "Home", href: STATIC_PATHS.HOME },
    { label: ENTITIES.WORKFLOWS, href: STATIC_PATHS.WORKFLOWS },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.href}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
        <BreadcrumbSeparator />
        <EditorNameForm workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
