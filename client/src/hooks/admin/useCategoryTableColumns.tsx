import { TablePseudoLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import type { SkillCategory } from "@/lib/schemas";
import type { TableColumnDef } from "@/lib/types/table.types";
import type { CellContext, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, type JSX } from "react";

export interface UseCategoryTableColumnsParams {
  onUpdateClick: (row: Row<SkillCategory>) => void;
  onDeleteClick: (row: Row<SkillCategory>) => void;
}

export function useCategoryTableColumns({
  onUpdateClick,
  onDeleteClick,
}: UseCategoryTableColumnsParams) {
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
    const cellValue = cell.getValue() as string;
    return (
      <TablePseudoLink 
        data-testid={`edit-category-${row.original.id}`} 
        onClick={() => onUpdateClick(row)}
      >
        <span data-testid={`category-${row.original.id}-name`}>{cellValue}</span>
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
              data-testid={`delete-category-${row.original.id}`}
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
    ] satisfies TableColumnDef<SkillCategory>[];
  }, [onUpdateClick, onDeleteClick]);
}
