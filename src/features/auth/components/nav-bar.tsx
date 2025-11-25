import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { APP_NAME } from "@/lib/constants";
import { AppLogo } from "@/components/app/AppLogo";

export async function NavBar() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="py-2 px-4 border-b">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo width={25} height={25} />
          <h1 className="text-lg font-semibold">{APP_NAME}</h1>
        </Link>
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
