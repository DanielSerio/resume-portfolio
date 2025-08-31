import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Layout } from "../Layout";
import { useLocation } from "@tanstack/react-router";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin";

  if (isLoginPage) {
    return <Layout name="admin">{children}</Layout>;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <Layout name="admin">
        <AdminHeader>
          <SidebarTrigger />
        </AdminHeader>

        {children}
      </Layout>
    </SidebarProvider>
  );
}
