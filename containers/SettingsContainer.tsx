"use client";

import React, { useState } from "react";
import {
  LogOut,
  Save,
  Lock,
  Building2,
  Loader2,
} from "lucide-react";
import userStore from "@/stores/UserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateBusinessSchema,
  UpdateBusinessFormValues,
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/schemas";
import { toast } from "react-toastify";

const SettingsContainer = () => {
  const [loadingBusiness, setLoadingBusiness] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Business Form
  const businessForm = useForm<UpdateBusinessFormValues>({
    resolver: zodResolver(updateBusinessSchema),
    defaultValues: {
      businessName: userStore.user?.business.name || "",
      businessType: userStore.user?.business.type || "",
    },
  });

  // Password Form
  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onBusinessSubmit = async (values: UpdateBusinessFormValues) => {
    try {
      setLoadingBusiness(true);

      // TODO: connect API
      console.log("Updating business:", values);

      const resp = await userStore.UpdateBusiness(values.businessName, values.businessType);
      if(resp.success) {
        toast.success("Business updated successfully");
        userStore.setUser(resp.data.user);
      }

    } finally {
      setLoadingBusiness(false);
    }
  };

  const onPasswordSubmit = async (values: ChangePasswordFormValues) => {
    try {
      setLoadingPassword(true);

      // TODO: connect API
      console.log("Changing password:", values);
      
      const resp = await userStore.ChangePassword(values.currentPassword, values.newPassword);
      if(resp.success){
        toast.success("Password updated successfully");
        passwordForm.reset();
      }

    } finally {
      setLoadingPassword(false);
    }
  };

  const handleLogout = () => {
    userStore.logout();
  };

  return (
    <div className="min-h-screen p-8 bg-linear-to-br from-black via-[#0f0f0f] to-black text-white space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-white/50 text-sm mt-1">
          Manage your business details and account settings.
        </p>
        <div className="w-16 h-[3px] mt-3 rounded-full bg-linear-to-r from-primary to-transparent" />
      </div>

      {/* Business Info */}
      <form
        onSubmit={businessForm.handleSubmit(onBusinessSubmit)}
        className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 space-y-6"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-white" />
          Business Information
        </h2>

        {/* Business Name */}
        <div>
          <label className="text-sm text-white/60">Business Name</label>
          <input
            {...businessForm.register("businessName")}
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
          />
          {businessForm.formState.errors.businessName && (
            <p className="text-red-400 text-sm mt-1">
              {businessForm.formState.errors.businessName.message}
            </p>
          )}
        </div>

        {/* Business Type */}
        <div>
          <label className="text-sm text-white/60">Business Type</label>
          <select
            {...businessForm.register("businessType")}
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
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

          {businessForm.formState.errors.businessType && (
            <p className="text-red-400 text-sm mt-1">
              {businessForm.formState.errors.businessType.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-lg shadow-primary/40"
        >
          {loadingBusiness ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </form>

      {/* Change Password */}
      <form
        onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
        className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 space-y-6"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="w-5 h-5 text-white" />
          Change Password
        </h2>

        <div>
          <label className="text-sm text-white/60">Current Password</label>
          <input
            type="password"
            {...passwordForm.register("currentPassword")}
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
          />
          {passwordForm.formState.errors.currentPassword && (
            <p className="text-red-400 text-sm mt-1">
              {passwordForm.formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-white/60">New Password</label>
          <input
            type="password"
            {...passwordForm.register("newPassword")}
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition"
          />
          {passwordForm.formState.errors.newPassword && (
            <p className="text-red-400 text-sm mt-1">
              {passwordForm.formState.errors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-xl text-sm font-medium hover:scale-105 transition-all shadow-lg shadow-primary/40"
        >
          {loadingPassword ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              Update Password
            </>
          )}
        </button>
      </form>

      {/* Logout */}
      <div className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-red-500/20">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-red-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-red-700 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsContainer;
