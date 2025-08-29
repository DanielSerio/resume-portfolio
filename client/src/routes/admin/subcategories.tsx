import { AdminSubcategoriesPage } from "@/pages/AdminSubcategoriesPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/subcategories")({
  beforeLoad: ({ context }) => {
    // If user is not logged in, redirect to login page
    if (!context.user) {
      throw redirect({ to: "/admin" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminSubcategoriesPage />;
}