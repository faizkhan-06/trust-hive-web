import { z } from "zod";

export const updateBusinessSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),

  businessType: z
    .string()
    .min(1, "Please select a business type"),
});

export type UpdateBusinessFormValues = z.infer<typeof updateBusinessSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),

  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters"),
});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
