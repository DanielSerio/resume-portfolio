import { CategoryForm } from "@/components/admin";
import { Table } from "@/components/core";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelectedEntity } from "@/hooks/admin";
import { useCategoryTable } from "@/hooks/admin/useCategoryTable";
import { useCategoriesList } from "@/hooks/resume";
import type { SkillCategory } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
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

export function AdminCategoriesPage() {
  const { supabase } = useRouteContext({ from: "/admin/categories" });

  const query = useCategoriesList(supabase);
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
  const [selectedCategory, { select, unselect }] =
    useSelectedEntity<SkillCategory>();

  const dismissSheet = () => {
    clearCreateLaunchedAt();
    clearDeleteLaunchedAt();
    unselect();
  };

  const { table, gridTemplateColumns } = useCategoryTable({
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
      <Button onClick={() => setCreateLaunchedAt()}>Create</Button>
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
