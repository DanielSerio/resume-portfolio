import { SkillForm } from "@/components/admin";
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
import { useSkillTable } from "@/hooks/admin/useSkillTable";
import { useCreateDeleteLaunchedAt } from "@/hooks/core/useLaunchedAt";
import { useSkillsList } from "@/hooks/resume";
import type { Skill } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

export function AdminSkillsPage() {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  const query = useSkillsList(supabase);
  const [{ createLaunchedAt, deleteLaunchedAt }, { launch, clear }] =
    useCreateDeleteLaunchedAt();
  const [selectedSkill, { select, unselect }] = useSelectedEntity<Skill>();

  const dismissSheet = () => {
    clear();
    unselect();
  };


  const { table, gridTemplateColumns } = useSkillTable({
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
        testId="skills-list"
        isLoading={query.isLoading}
        table={table}
        gridTemplateColumns={gridTemplateColumns}
      />
      <div className="p-4">
        <Button data-testid="add-skill-button" onClick={() => launch("create")}>Create a New Skill</Button>
      </div>
      <Sheet
        open={
          selectedSkill !== null ||
          createLaunchedAt !== null ||
          deleteLaunchedAt !== null
        }
        onOpenChange={dismissSheet}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="capitalize">{mode} skill</SheetTitle>
            <SheetDescription>
              {mode === "create" ? `Create a new` : mode} skill
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 flex-1">
            <SkillForm
              skill={selectedSkill ?? undefined}
              mode={mode}
              onSuccess={() => dismissSheet()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Page>
  );
}
