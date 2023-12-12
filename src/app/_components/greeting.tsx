import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function Greeting() {
  const session = await getServerAuthSession();

  return (
    <div className="flex items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>{session.user?.name}</span>}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="mx-4 rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
