import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: ({ context }) => {
    // If user is already logged in, redirect to skills page
    if (context.user) {
      throw redirect({ to: "/admin/skills" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminLoginPage />;
}