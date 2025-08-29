import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Layout } from "../Layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Layout name="admin">
        <AdminSidebar />

        <AdminHeader>
          <SidebarTrigger />
        </AdminHeader>

        {children}
      </Layout>
    </SidebarProvider>
  );
}
