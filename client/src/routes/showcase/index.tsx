import { ShowcaseListPage } from "@/pages/ShowcaseListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/showcase/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShowcaseListPage />;
}