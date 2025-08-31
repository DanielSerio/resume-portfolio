import { CategoryForm } from "@/components/admin";
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
import { useCategoryTable } from "@/hooks/admin/useCategoryTable";
import { useCreateDeleteLaunchedAt } from "@/hooks/core/useLaunchedAt";
import { useCategoriesList } from "@/hooks/resume";
import type { SkillCategory } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

export function AdminCategoriesPage() {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  const query = useCategoriesList(supabase);
  const [{ createLaunchedAt, deleteLaunchedAt }, { launch, clear }] =
    useCreateDeleteLaunchedAt();
  const [selectedCategory, { select, unselect }] =
    useSelectedEntity<SkillCategory>();

  const dismissSheet = () => {
    clear();
    unselect();
  };

  const { table, gridTemplateColumns } = useCategoryTable({
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
        <Button onClick={() => launch("create")}>Create a New Category</Button>
      </div>
      <Sheet
        open={selectedCategory !== null || createLaunchedAt !== null}
        onOpenChange={dismissSheet}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="capitalize">{mode} category</SheetTitle>
            <SheetDescription>
              {mode === "create" ? `Create a new` : mode} skill category
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 flex-1">
            <CategoryForm
              category={selectedCategory ?? undefined}
              mode={mode}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Page>
  );
}
