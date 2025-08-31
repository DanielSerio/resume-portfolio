import type { Client } from "@/main";
import { useZodForm } from "../core/useZodForm";
import { LoginSchema, type Login } from "@/lib/schemas";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useLoginForm(supabase: Client) {
  const navigate = useNavigate();

  return useZodForm({
    schema: LoginSchema,
    mutationFn: async (data: Login) => {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      return authData;
    },
    onSuccess: () => navigate({ to: '/admin/skills' }),
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
}