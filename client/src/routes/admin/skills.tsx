import { AdminSkillsPage } from "@/pages/AdminSkillsPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/skills")({
  beforeLoad: ({ context }) => {
    // If user is not logged in, redirect to login page
    if (!context.user) {
      throw redirect({ to: "/admin" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminSkillsPage />;
}