"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthFormValues } from "@/schemas";

const LoginContainer = () => {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: AuthFormValues) => {
    try {
      console.log("Login values:", values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-inter relative">

      {/* LEFT PANEL — Trust Hive Branding */}
      <div className="relative hidden md:flex items-center justify-center bg-primary overflow-hidden">

        {/* Soft gradient lights */}
        <div className="absolute w-[450px] h-[450px] bg-white/10 blur-3xl rounded-full -top-10 -left-10" />
        <div className="absolute w-[380px] h-[380px] bg-white/5 blur-3xl rounded-full bottom-10 -right-10" />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* Trust Hive text */}
        <div className="relative text-center text-white px-8">
          <h1 className="text-5xl font-extrabold font-black-han-sans drop-shadow-xl">
            Trust Hive
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Secure. Reliable. Seamless experience.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — Clean & Flat (NO CARD) */}
      <div className="relative flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 py-16">

        {/* Soft background wash */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white via-white to-gray-50" />

        {/* floating soft lights */}
        <div className="absolute w-56 h-56 bg-primary/10 blur-3xl rounded-full -top-4 right-6 hidden sm:block" />
        <div className="absolute w-48 h-48 bg-primary/5 blur-3xl rounded-full bottom-6 -left-6 hidden sm:block" />

        <div className="relative w-full max-w-md mx-auto">

          {/* Mobile Header */}
          <div className="md:hidden text-center mb-12">
            <h1 className="text-[42px] font-extrabold text-primary font-black-han-sans leading-tight">
              Trust Hive
            </h1>
            <p className="text-gray-600 mt-2">
              Secure. Reliable. Seamless experience.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-10 text-sm md:text-base">
            Login to continue your seamless experience.
          </p>

          {/* FORM */}
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                  focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                placeholder="you@example.com"
              />
              {form.formState.errors.email?.message && (
                <p className="text-red-600 text-sm animate-fadeIn">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                {...form.register("password")}
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                  focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition"
                placeholder="••••••••"
              />
              {form.formState.errors.password?.message && (
                <p className="text-red-600 text-sm animate-fadeIn">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button
                type="button"
                className="text-primary text-sm font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-md 
                hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              Login
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
