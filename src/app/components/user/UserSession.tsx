"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import clx from "classnames";

export default function UserSession() {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <main
      className={clx(
        "mt-5 flex justify-center text-black w-[350px] p-3 rounded-md",
        session && "bg-gray-300/90"
      )}
    >
      <div className="flex flex-col space-y-4">
        {session && (
          <>
            <h2 className="text-xl font-bold">User Profile</h2>
            {/* User Profile */}
            <img
              src={session.user?.image || "/default-profile.png"}
              alt="User Profile"
              className="rounded-full w-20 h-20"
            />
            <pre>Name:{JSON.stringify(session.user?.name)} </pre>{" "}
            <pre>Email:{JSON.stringify(session.user?.email)} </pre>{" "}
            <button
              className="mt-3 bg-blue-500 p-3 text-white"
              onClick={() => signOut()}
            >
              {" "}
              Sign out{" "}
            </button>{" "}
          </>
        )}{" "}
        {!session && pathname !== "/signin" && (
          <button
            className="bg-slate-500 text-white p-2 rounded-md"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}{" "}
      </div>
    </main>
  );
}
