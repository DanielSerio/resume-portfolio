import { Page } from "@/components/layout/Page";
import { useCategoryTable } from "@/hooks/admin/useCategoryTable";
import { useCategoriesList } from "@/hooks/resume";
import { useRouteContext } from "@tanstack/react-router";

export function AdminCategoriesPage() {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  const query = useCategoriesList(supabase);
  const table = useCategoryTable({ query });

  return (
    <Page>
      <div>AdminCategoriesPage</div>
    </Page>
  );
}
