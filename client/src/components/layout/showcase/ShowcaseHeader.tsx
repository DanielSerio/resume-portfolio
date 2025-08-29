import type { PropsWithChildren } from "react";
import { Header } from "../Header";

export function ShowcaseHeader({ children }: PropsWithChildren) {
  return <Header>{children}</Header>;
}
