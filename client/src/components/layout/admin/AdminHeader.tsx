import type { PropsWithChildren } from "react";
import { Header } from "../Header";

export function AdminHeader({ children }: PropsWithChildren) {
  return <Header>{children}</Header>;
}
