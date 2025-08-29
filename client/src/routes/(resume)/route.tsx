import { ResumeLayout } from "@/components/layout/resume/ResumeLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(resume)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ResumeLayout>
      <Outlet />
    </ResumeLayout>
  );
}
