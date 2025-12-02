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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-inter">

      {/* LEFT PANEL */}
      <div className="relative hidden md:flex items-center justify-center bg-primary overflow-hidden">

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* Floating blurred shapes */}
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute w-80 h-80 bg-white/5 rounded-full blur-3xl bottom-0 -right-10 animate-[float_10s_ease-in-out_infinite]" />

        {/* Center content */}
        <div className="relative text-center text-white px-8">
          <h1 className="text-5xl font-extrabold drop-shadow-xl font-black-han-sans">
            Trust Hive
          </h1>
          <p className="mt-4 text-lg text-white/80 font-medium">
            Your trusted platform for customer insights.          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 bg-white relative overflow-hidden py-16 md:py-0">

        {/* subtle gradient wash */}
        <div className="absolute inset-0 bg-linear-to-b from-white via-white to-gray-50 pointer-events-none" />

        {/* floating blurred lights */}
        <div className="absolute w-64 h-64 bg-primary/10 blur-3xl rounded-full -top-10 right-5 hidden sm:block" />
        <div className="absolute w-56 h-56 bg-primary/5 blur-3xl rounded-full bottom-5 -left-5 hidden sm:block" />


        {/* Register content */}
        <div className="relative w-full max-w-md mx-auto">
          {/* Mobile Trust Hive Header */}
          <div className="md:hidden mb-12 text-center px-4">
            <h1 className="text-[42px] leading-tight font-extrabold text-primary font-black-han-sans tracking-tight">
              Trust Hive
            </h1>
            <p className="mt-3 text-gray-700 text-base font-medium">
              Secure. Reliable. Seamless experience.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Create your account
          </h2>
          <p className="text-gray-500 mb-10 text-sm md:text-base">
            Join Trust Hive to collect genuine customer reviews.
          </p>

          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition outline-none"
                placeholder="you@example.com"
              />
              {
                form.formState.errors.email?.message && (
                  <p className="text-red-600 text-sm flex items-center gap-1 animate-fadeIn">
                    {form.formState.errors.email.message}
                  </p>
                )
              }
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                {...form.register("password")}
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition outline-none"
                placeholder="********"
              />
              {
                form.formState.errors.password?.message && (
                  <p className="text-red-600 text-sm flex items-center gap-1 animate-fadeIn">
                    {form.formState.errors.password.message}
                  </p>
                )
              }
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Business Name</label>
              <input
                {...form.register("businessName")}
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition outline-none"
                placeholder="What is your business called?"
              />
              {
                form.formState.errors.password?.message && (
                  <p className="text-red-600 text-sm flex items-center gap-1 animate-fadeIn">
                    {form.formState.errors.businessName?.message}
                  </p>
                )
              }
            </div>

            {/* Business Type */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 font-medium">Business Type</label>

              <div className="relative">
                <select
                  {...form.register("businessType")}
                  className="
        w-full appearance-none px-4 py-3 
        bg-gray-50 border border-gray-200 
        rounded-xl shadow-sm 
        focus:ring-2 focus:ring-primary/30 
        focus:border-primary 
        transition-all outline-none
        text-gray-800 font-medium
        hover:bg-gray-100
      "
                >
                  <option value="" disabled className="text-gray-400 bg-white">
                    Select business type
                  </option>

                  <option value="Restaurant" className="bg-white text-gray-800 font-medium">
                    🍽️ Restaurant
                  </option>

                  <option value="Retail Store" className="bg-white text-gray-800 font-medium">
                    🏪 Retail Store
                  </option>

                  <option value="Service Provider" className="bg-white text-gray-800 font-medium">
                    🛠️ Service Provider
                  </option>

                  <option value="E-Commerce" className="bg-white text-gray-800 font-medium">
                    🛒 E-Commerce
                  </option>

                  <option value="Healthcare" className="bg-white text-gray-800 font-medium">
                    🏥 Healthcare
                  </option>

                  <option value="Education" className="bg-white text-gray-800 font-medium">
                    🎓 Education
                  </option>

                  <option value="Real Estate" className="bg-white text-gray-800 font-medium">
                    🏡 Real Estate
                  </option>

                  <option value="Automotive" className="bg-white text-gray-800 font-medium">
                    🚗 Automotive
                  </option>

                  <option value="Other" className="bg-white text-gray-800 font-medium">
                    ⭐ Other
                  </option>

                </select>

                {/* Icon */}
                <ChevronsUpDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>

              {form.formState.errors.businessType?.message && (
                <p className="text-red-600 text-sm flex items-center gap-1 animate-fadeIn">
                  {form.formState.errors.businessType.message}
                </p>
              )}
            </div>


            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white rounded-md font-semibold hover:bg-primary/90 cursor-pointer transition flex items-center justify-center"
            >
              {loading ? <Loader2 className=' animate-spin' /> : "Create Account"} 
            </button>




            {/* Login Redirect */}
            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <a
                  href="/cmi/login"
                  className="text-primary font-semibold hover:underline hover:text-primary/80 transition"
                >
                  Login
                </a>
              </p>
            </div>

          </form>
        </div>
      </div>


    </div>
  );
};

export default RegisterContainer;
