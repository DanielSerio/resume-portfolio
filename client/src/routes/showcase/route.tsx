import ShowcaseLayout from "@/components/layout/showcase/ShowcaseLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/showcase")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ShowcaseLayout>
      <Outlet />
    </ShowcaseLayout>
  );
}
