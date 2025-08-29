import { useRouterState } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren<{ name: string }>) {
  const state = useRouterState();

  return (
    <div
      id="layout"
      className={`layout ${name}`}
      data-href={state.resolvedLocation?.href}
    >
      {children}
    </div>
  );
}
