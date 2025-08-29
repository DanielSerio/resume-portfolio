import { supabase } from "@/lib/supabase";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

async function fetchSession() {
  const { data } = await supabase.auth.getUser();

  return {
    supabase,
    user: data.user ?? null,
  };
}

export const Route = createRootRoute({
  async beforeLoad() {
    return await fetchSession();
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
