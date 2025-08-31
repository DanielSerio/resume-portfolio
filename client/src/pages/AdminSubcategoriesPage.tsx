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
import { useSubcategoriesList } from "@/hooks/resume";
import type { SkillSubcategory } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";
import { useCallback, useState } from "react";

function useLaunchedAt() {
  const [createLaunchedAt, setCreateLaunchedAt] = useState<Date | null>(null);

  const setLaunchedAt = useCallback(
    () => setCreateLaunchedAt(new Date()),
    [setCreateLaunchedAt]
  );

  const clearLaunchedAt = useCallback(
    () => setCreateLaunchedAt(null),
    [setCreateLaunchedAt]
  );

  return [createLaunchedAt, { setLaunchedAt, clearLaunchedAt }] as const;
}

export function AdminSubcategoriesPage() {
  const { supabase } = useRouteContext({ from: "/admin/subcategories" });

  const query = useSubcategoriesList(supabase);
  const [
    createLaunchedAt,
    {
      setLaunchedAt: setCreateLaunchedAt,
      clearLaunchedAt: clearCreateLaunchedAt,
    },
  ] = useLaunchedAt();
  const [
    deleteLaunchedAt,
    {
      setLaunchedAt: setDeleteLaunchedAt,
      clearLaunchedAt: clearDeleteLaunchedAt,
    },
  ] = useLaunchedAt();
  const [selectedSubcategory, { select, unselect }] =
    useSelectedEntity<SkillSubcategory>();

  const dismissSheet = () => {
    clearCreateLaunchedAt();
    clearDeleteLaunchedAt();
    unselect();
  };

  const { table, gridTemplateColumns } = useSubcategoryTable({
    query,
    onDeleteClick: (row) => {
      select(row.original);
      setDeleteLaunchedAt();
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
        <Button onClick={() => setCreateLaunchedAt()}>
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