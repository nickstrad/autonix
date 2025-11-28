import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "./user-nav";

export async function NavBar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="py-2 px-4 border-b">
      <nav className="flex items-center justify-end">
        <div>
          {session?.user ? (
            <UserNav
              user={{ ...session.user, image: session.user.image ?? null }}
            />
          ) : (
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
