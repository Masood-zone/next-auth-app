"use client";

import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
};

export default function SigninPage() {
  const form = useForm<FormData>();

  const [isPending, startTransition] = useTransition();

  async function sendMagikLink(data: FormData) {
    startTransition(async () => {
      // Send magic link to email
      try {
        const signInResponse = await signIn("resend", {
          email: data.email.toLowerCase(),
          redirect: false,
          callbackUrl: "/protected",
        });
        if (signInResponse?.ok && !signInResponse.error) {
          toast.success("Magic link sent to your email", {
            duration: 2000,
            icon: "🚀",
          });
          return;
        }
      } catch (error) {
        console.error("Error sending magic link", error);
        toast.error("Error sending magic link", {
          duration: 2000,
          icon: "❌",
        });
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(sendMagikLink)}
      className="flex flex-col items-center space-y-4 bg-gray-700 p-10"
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        {...form.register("email", { required: true })}
        className="border border-gray-300 rounded-md p-2"
      />
      <p>We&lsquo;ll send your login link here:</p>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Sign in with Email"}
      </button>
      <button
        onClick={() => signIn("github", { callbackUrl: "/protected" })}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Sign in with GitHub
      </button>
    </form>
  );
}
