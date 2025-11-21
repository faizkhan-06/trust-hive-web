import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Please provide email." })
    .max(100, { message: "Max length is 100." })
    .pipe(
      z.email({ message: "Invalid email address." })
    ),

  password: z
    .string()
    .trim()
    .min(1, { message: "Please provide password." }) // <- EMPTY CHECK
    .min(6, { message: "Min length is 6." })
    .max(100, { message: "Max length is 100." })
});

export type AuthFormValues = z.infer<typeof authSchema>;
