import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "Please provide email." })
    .max(100, { error: "Max length is 100." })
    .pipe(z.email({ error: "Invalid email address." })),

  password: z
    .string()
    .trim()
    .min(1, { error: "Please provide password." })
    .min(6, { error: "Min length is 6." })
    .max(100, { error: "Max length is 100." }),
});

export const registerAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "Please provide email." })
    .max(100, { error: "Max length is 100." })
    .pipe(z.email({ error: "Invalid email address." })),

  password: z
    .string()
    .trim()
    .min(1, { error: "Please provide password." })
    .min(6, { error: "Min length is 6." })
    .max(100, { error: "Max length is 100." }),

  businessName: z
    .string()
    .trim()
    .min(1, { error: "Please provide business name" })
    .max(200, { error: "Max length is 200" }),

  businessType: z
    .string()
    .trim()
    .min(1, { error: "Please provide business type" })
    .max(200, { error: "Max length is 200" }),
});

export type AuthFormValues = z.infer<typeof authSchema>;
export type RegisterFormValues = z.infer<typeof registerAuthSchema>;
