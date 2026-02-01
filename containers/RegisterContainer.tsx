"use client"

import { RegisterFormValues, registerAuthSchema } from '@/schemas';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import userStore from '@/stores/UserStore';
import { CMI_TOKEN } from '@/configs/constants';
import useCookie from '@/hooks/useCookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import logo from "@/public/assets/logo.svg"
import Image from 'next/image';

const RegisterContainer = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const { setCookie } = useCookie();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerAuthSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setLoading(true);
      const resp = await userStore.Register(values.email, values.password, values.businessName, values.businessType);

      if (resp.success) {
        userStore.setUser(resp.data.user);
        setCookie(CMI_TOKEN, resp.data.token);
        toast.success("Registerd successfully");
        router.replace("/cmi/dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black grid grid-cols-1 md:grid-cols-2 text-white">
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-black p-8">

        <div className="relative w-full max-w-xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl">

          {/* Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-[#d8b4fe] via-[#7c3aed] to-black z-0" />

          {/* Dark circular glow (behind content) */}
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[100%] bg-black rounded-full blur-3xl opacity-80 z-10" />

          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-20"
            style={{
              backgroundImage:
                "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

          {/* Content (always on top) */}
          <div className="relative z-30 h-full flex flex-col justify-end text-center px-10 pb-16">

            <div className="flex items-center justify-center gap-2 mb-6">
              <Image
                src={logo}
                alt="Trust Hive"
                className="h-10 max-h-10 w-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Get Started with Us
            </h1>

            <p className="text-white/70 mb-10 max-w-sm mx-auto">
              Complete these easy steps to register your account.
            </p>

            <div className="w-full max-w-sm mx-auto space-y-4">

              <div className="flex items-center gap-3 bg-white text-black rounded-xl px-4 py-3 shadow-xl">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                  1
                </div>
                <span className="text-sm font-medium">
                  Create your business account
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white/80">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-white text-sm">
                  2
                </div>
                <span className="text-sm">
                  Generate & share your QR code
                </span>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-white/80">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-white text-sm">
                  3
                </div>
                <span className="text-sm">
                  Monitor and manage reviews in your dashboard
                </span>
              </div>

            </div>


          </div>
        </div>
      </div>



      {/* RIGHT SIDE */}
      <div className="flex items-center md:justify-start justify-center px-6 sm:px-12 bg-black">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center mb-6">
            <Image
              src={logo}
              alt="Trust Hive"
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <h2 className="text-3xl font-semibold mb-2 text-center md:text-left">
            Sign Up Account
          </h2>

          <p className="text-white/60 mb-8">
            Enter your business details to create your account.
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
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
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
              {form.formState.errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <label className="text-sm text-white/70">Business Name</label>
              <input
                {...form.register("businessName")}
                type="text"
                placeholder="Your business name"
                className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {form.formState.errors.businessName && (
                <p className="text-red-400 text-sm mt-1">
                  {form.formState.errors.businessName.message}
                </p>
              )}
            </div>

            {/* Business Type */}
            <div>
              <label className="text-sm text-white/70">Business Type</label>
              <select
                {...form.register("businessType")}
                className="w-full mt-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              >
                <option value="" className="bg-black">
                  Select business type
                </option>
                <option value="Restaurant" className="bg-black">
                  Restaurant
                </option>
                <option value="Retail Store" className="bg-black">
                  Retail Store
                </option>
                <option value="Service Provider" className="bg-black">
                  Service Provider
                </option>
                <option value="E-Commerce" className="bg-black">
                  E-Commerce
                </option>
                <option value="Other" className="bg-black">
                  Other
                </option>
              </select>

              {form.formState.errors.businessType && (
                <p className="text-red-400 text-sm mt-1">
                  {form.formState.errors.businessType.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Login */}
            <p className="text-sm text-center text-white/60 mt-4">
              Already have an account?{" "}
              <a href="/cmi/login" className="text-white underline">
                Log in
              </a>
            </p>

          </form>
        </div>
      </div>

    </div>
  );

};

export default RegisterContainer;
