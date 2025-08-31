import { Table } from "@/components/core";
import { Page } from "@/components/layout/Page";
import { useCategoryTable } from "@/hooks/admin/useCategoryTable";
import { useCategoriesList } from "@/hooks/resume";
import { useRouteContext } from "@tanstack/react-router";

export function AdminCategoriesPage() {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  const query = useCategoriesList(supabase);
  const { table, gridTemplateColumns } = useCategoryTable({ query });

  return (
    <Page>
      <Table
        isLoading={query.isLoading}
        table={table}
        gridTemplateColumns={gridTemplateColumns}
      />
    </Page>
  );
}
