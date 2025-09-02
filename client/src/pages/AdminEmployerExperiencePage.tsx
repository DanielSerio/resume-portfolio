import { EmployerExperienceForm } from "@/components/admin";
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
import { useEmployerExperienceTable } from "@/hooks/admin/useEmployerExperienceTable";
import { useCreateDeleteLaunchedAt } from "@/hooks/core/useLaunchedAt";
import { useEmployerExperiencesList } from "@/hooks/resume";
import type { EmployerExperience } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";

export function AdminEmployerExperiencePage() {
  const { supabase } = useRouteContext({ from: "/admin/employer-experiences" });

  const query = useEmployerExperiencesList(supabase);
  const [{ createLaunchedAt, deleteLaunchedAt }, { launch, clear }] =
    useCreateDeleteLaunchedAt();
  const [selectedEmployerExperience, { select, unselect }] =
    useSelectedEntity<EmployerExperience>();

  const dismissSheet = () => {
    clear();
    unselect();
  };

  const { table, gridTemplateColumns } = useEmployerExperienceTable({
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
        testId="employer-experiences-list"
        isLoading={query.isLoading}
        table={table}
        gridTemplateColumns={gridTemplateColumns}
      />
      <div className="p-4">
        <Button
          data-testid="add-employer-experience-button"
          onClick={() => launch("create")}
        >
          Create a New Employer Experience
        </Button>
      </div>
      <Sheet
        open={
          selectedEmployerExperience !== null ||
          createLaunchedAt !== null ||
          deleteLaunchedAt !== null
        }
        onOpenChange={dismissSheet}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="capitalize">
              {mode} employer experience
            </SheetTitle>
            <SheetDescription>
              {mode === "create" ? `Create a new` : mode} employer experience
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 flex-1">
            <EmployerExperienceForm
              employerExperience={selectedEmployerExperience ?? undefined}
              mode={mode}
              onSuccess={() => dismissSheet()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Page>
  );
}
