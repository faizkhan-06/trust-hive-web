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
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      {/* Outer container */}
      <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* LEFT - Logo + Login Form */}
        <div className="max-w-sm w-full mx-auto flex flex-col">

          {/* Logo Above Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-black-han-sans font-extrabold text-primary drop-shadow-sm">
              Trust Hive
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-primary">
            Sign in to your account
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Access your dashboard and manage your customer reviews.
          </p>

          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">Email</label>
              <input
                {...form.register("email")}
                type="email"
                placeholder="jane.doe@you.com"
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-md text-[15px]
              focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">Password</label>
              <input
                {...form.register("password")}
                type="password"
                placeholder="********"
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-md text-[15px]
              focus:ring-2 focus:ring-primary/40 outline-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700 text-sm">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 cursor-pointer transition flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?
              <Link href="/cmi/register" className="text-primary hover:underline font-medium ml-1">
                Sign up
              </Link>
            </p>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="max-w-md hidden mx-auto md:flex flex-col justify-center">

          <h2 className="text-xl font-semibold text-primary mb-4 leading-snug">
            Trusted by businesses for reliable review collection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Feature icon={MessageCircle} text="Collect verified customer reviews" />
            <Feature icon={Star} text="Build trust & brand credibility" />
            <Feature icon={BarChart3} text="Analytics & sentiment scoring" />
            <Feature icon={Handshake} text="AI-powered insights & automation" />
          </div>

          <div className="flex justify-start">
            <Image
              src={illustration}
              alt="illustration"
              className="w-[350px] max-w-full"
            />
          </div>

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
