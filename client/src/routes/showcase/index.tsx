import { ShowcaseAboutPage } from "@/pages/ShowcaseAboutPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/showcase/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShowcaseAboutPage />;
}
