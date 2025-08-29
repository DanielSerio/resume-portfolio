import type { PropsWithChildren } from "react";
import { Layout } from "../Layout";
import { ResumeHeader } from "./ResumeHeader";

export function ResumeLayout({ children }: PropsWithChildren) {
  return (
    <Layout name="resume">
      <ResumeHeader />
      {children}
    </Layout>
  );
}
