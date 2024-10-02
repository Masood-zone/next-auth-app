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
        "mt-5 flex justify-center text-black w-[350px] p-3 rounded-md"
      )}
    >
      <div className="flex flex-col space-y-4">
        {session && (
          <div className="flex flex-col items-center space-y-4 bg-gray-700 w-96 h-96 my-10 mx-auto p-5 justify-center">
            <h1 className="text-2xl">Welcome back!</h1>
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="rounded-full h-20 w-20"
            />
            <h1 className="text-2xl">{session?.user?.name}</h1>
            <p className="text-gray-500">{session?.user?.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Log out
            </button>
          </div>
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
