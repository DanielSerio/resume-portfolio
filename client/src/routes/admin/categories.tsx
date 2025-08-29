import { AdminCategoriesPage } from "@/pages/AdminCategoriesPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/categories")({
  beforeLoad: ({ context }) => {
    // If user is not logged in, redirect to login page
    if (!context.user) {
      throw redirect({ to: "/admin" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminCategoriesPage />;
}