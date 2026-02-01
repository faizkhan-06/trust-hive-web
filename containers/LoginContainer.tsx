"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthFormValues } from "@/schemas";
import userStore from "@/stores/UserStore";
import { useRouter } from "next/navigation";
import { CMI_TOKEN } from "@/configs/constants";
import useCookie from "@/hooks/useCookie";
import { Loader2, MessageCircle, Star, BarChart3, Handshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import illustration from "@/public/illustration.svg";
import { toast } from "react-toastify";
import logo from "@/public/assets/logo.svg"

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCookie } = useCookie();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    try {
      setLoading(true);
      const resp = await userStore.Login(values.email, values.password);

      if (resp.success) {
        userStore.setUser(resp.data.user);
        setCookie(CMI_TOKEN, resp.data.token);
        toast.success("Logged in successfully");
        router.replace("/cmi/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black grid grid-cols-1 md:grid-cols-2 text-white">

      {/* LEFT SIDE - Branding Panel */}
      <div className="hidden md:flex relative items-center justify-center p-10">

        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-black to-black opacity-90" />

        <div className="relative z-10 max-w-md">

          <h1 className="text-4xl font-bold mb-6">
            Welcome Back 👋
          </h1>

          <p className="text-white/70 mb-8">
            Log in to manage your QR codes, monitor reviews, and track your business reputation in one powerful dashboard.
          </p>

          <div className="space-y-4 text-white/80 text-sm">
            <p>✔ Access all customer reviews</p>
            <p>✔ Monitor ratings in real-time</p>
            <p>✔ Manage your business insights</p>
          </div>

        </div>
      </div>


      {/* RIGHT SIDE - Login Form */}
      <div className="flex items-center justify-center px-6 sm:px-12">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start mb-8">
            <Image
              src={logo}
              alt="Trust Hive"
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <h2 className="text-3xl font-semibold mb-2">
            Sign In
          </h2>

          <p className="text-white/60 mb-8">
            Enter your credentials to access your dashboard.
          </p>

          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

            {/* Email */}
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                {...form.register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-white/70">Password</label>
              <input
                {...form.register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm text-white/60">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>

            <p className="text-center text-sm text-white/60 mt-4">
              Don’t have an account?{" "}
              <Link href="/cmi/register" className="text-white underline">
                Sign up
              </Link>
            </p>

          </form>
        </div>

      </div>

    </div>
  );


};

const Feature = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-full bg-[#F2F6FA] flex items-center justify-center">
      <Icon size={20} className="text-primary]" />
    </div>
    <p className="text-gray-700 text-[15px]">{text}</p>
  </div>
);

export default LoginContainer;
