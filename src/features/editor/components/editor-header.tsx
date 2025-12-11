import { UserNav } from "@/features/auth/components/user-nav";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { EditorBreadcrumbs } from "./editor-breadcrumbs";
import { EditorSaveButton } from "./editor";

export const EditorHeader = async ({ workflowId }: { workflowId: string }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="flex flow-row justify-between h-14 shrink-0 items-center gap-4 border-b px-4 bg-background ">
      <div className="flex items-center gap-4 justify-between w-full">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
      <div>
        {session?.user && (
          <UserNav
            user={{ ...session.user, image: session.user.image ?? null }}
          />
        )}
      </div>
    </header>
  );
};
