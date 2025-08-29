import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ShowcaseSidebar } from "./ShowcaseSidebar";

import { Layout } from "../Layout";
import { ShowcaseHeader } from "./ShowcaseHeader";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Layout name="showcase">
        <ShowcaseSidebar />

        <ShowcaseHeader>
          <SidebarTrigger />
        </ShowcaseHeader>

        {children}
      </Layout>
    </SidebarProvider>
  );
}
