import { TablePseudoLink } from "@/components/core";
import { Button } from "@/components/ui/button";

import type { TableColumnDef } from "@/lib/types/table.types";
import type { CellContext, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, type JSX } from "react";
import type { useEmployerExperiencesList } from "../resume";

type EmployerExperience = NonNullable<
  ReturnType<typeof useEmployerExperiencesList>["data"]
>[number];

export interface UseEmployerExperienceTableColumnsParams {
  onUpdateClick: (row: Row<EmployerExperience>) => void;
  onDeleteClick: (row: Row<EmployerExperience>) => void;
}

export function useEmployerExperienceTableColumns({
  onUpdateClick,
  onDeleteClick,
}: UseEmployerExperienceTableColumnsParams) {
  function UpdateCell({
    cell,
    row,
  }: CellContext<
    {
      id: string;
      name: string;
    },
    unknown
  >): JSX.Element {
    return (
      <TablePseudoLink
        onClick={() => onUpdateClick(row)}
        data-testid={`edit-employer-experience-${row.original.id}`}
      >
        {cell.getValue() as string}
      </TablePseudoLink>
    );
  }

  return useMemo(() => {
    return [
      {
        id: "id",
        label: "ID",
        size: 130,
        accessorKey: "id",
        header: "ID",
        cell: UpdateCell,
      },
      {
        id: "name",
        label: "Name",
        size: 120,
        accessorKey: "name",
        header: "Name",
        cell: UpdateCell,
      },
      {
        id: "actions",
        label: "",
        size: 60,
        cell({ row }) {
          return (
            <Button
              data-testid={`delete-employer-experience-${row.original.id}`}
              className="w-[24px] h-[24px] text-destructive"
              variant="ghost"
              size="icon"
              onClick={() => onDeleteClick(row)}
            >
              <Trash />
            </Button>
          );
        },
      },
    ] satisfies TableColumnDef<EmployerExperience>[];
  }, [onUpdateClick, onDeleteClick]);
}
