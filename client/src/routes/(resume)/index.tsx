import { ResumePage } from "@/pages/ResumePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(resume)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const ctx = Route.useRouteContext();

  return <ResumePage supabase={ctx.supabase} />;
}
