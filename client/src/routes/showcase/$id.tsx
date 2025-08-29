import { ShowcaseEntityPage } from "@/pages/ShowcaseEntityPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/showcase/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShowcaseEntityPage />;
}