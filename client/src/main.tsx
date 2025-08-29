import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

import { supabase } from "./lib/supabase";
import { QUERY_CLIENT } from "./lib/query-client";

import "./styles/index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create router context type
export interface RouterContext {
  supabase: typeof supabase;
  user: User | null;
}

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    supabase,
    user: null,
  } as RouterContext,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update router context when user changes
  useEffect(() => {
    router.update({
      context: {
        supabase,
        user,
      },
    });
  }, [user]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
