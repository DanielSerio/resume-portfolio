import { SubcategoryForm } from "@/components/admin";
import { Table } from "@/components/core";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelectedEntity } from "@/hooks/admin";
import { useSubcategoryTable } from "@/hooks/admin/useSubcategoryTable";
import { useCreateDeleteLaunchedAt } from "@/hooks/core/useLaunchedAt";
import { useSubcategoriesList } from "@/hooks/resume";
import type { SkillSubcategory } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

export function AdminSubcategoriesPage() {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });

  const query = useSubcategoriesList(supabase);
  const [{ createLaunchedAt, deleteLaunchedAt }, { launch, clear }] =
    useCreateDeleteLaunchedAt();
  const [selectedSubcategory, { select, unselect }] =
    useSelectedEntity<SkillSubcategory>();

  const dismissSheet = () => {
    clear();
    unselect();
  };

  const { table, gridTemplateColumns } = useSubcategoryTable({
    query,
    onDeleteClick: (row) => {
      select(row.original);
      launch("delete");
    },
    onUpdateClick: (row) => select(row.original),
  });

  const mode = createLaunchedAt
    ? "create"
    : deleteLaunchedAt
      ? "delete"
      : "update";

  return (
    <Page>
      <Table
        isLoading={query.isLoading}
        table={table}
        gridTemplateColumns={gridTemplateColumns}
      />
      <div className="p-4">
        <Button onClick={() => launch("create")}>
          Create a New Subcategory
        </Button>
      </div>
      <Sheet
        open={selectedSubcategory !== null || createLaunchedAt !== null}
        onOpenChange={dismissSheet}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="capitalize">{mode} subcategory</SheetTitle>
            <SheetDescription>
              {mode === "create" ? `Create a new` : mode} skill subcategory
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 flex-1">
            <SubcategoryForm
              subcategory={selectedSubcategory ?? undefined}
              mode={mode}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Page>
  );
}