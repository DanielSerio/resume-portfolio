import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type Login = z.infer<typeof LoginSchema>;