import { useRouterState } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export function Layout({
  children,
  name,
}: PropsWithChildren<{ name: string }>) {
  const state = useRouterState();

  return (
    <div
      id="layout"
      className={`layout bg-background dark:bg-gray-900 ${name}`}
      data-href={state.resolvedLocation?.href}
    >
      {children}
    </div>
  );
}
