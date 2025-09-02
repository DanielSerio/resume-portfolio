import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { Layout } from "../Layout";
import { useLocation, useRouteContext, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const router = useRouter();
  const { supabase } = useRouteContext({ from: "/admin" });
  const isLoginPage = location.pathname === "/admin";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.navigate({ to: "/admin" });
  };

  if (isLoginPage) {
    return <Layout name="admin">{children}</Layout>;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <Layout name="admin">
        <AdminHeader>
          <SidebarTrigger />
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </AdminHeader>

        {children}
      </Layout>
    </SidebarProvider>
  );
}
