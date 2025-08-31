import { TablePseudoLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import type { Skill } from "@/lib/schemas";
import type { TableColumnDef } from "@/lib/types/table.types";
import type { CellContext, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, type JSX } from "react";

export interface UseSkillTableColumnsParams {
  onUpdateClick: (row: Row<Skill>) => void;
  onDeleteClick: (row: Row<Skill>) => void;
}

export function useSkillTableColumns({
  onUpdateClick,
  onDeleteClick,
}: UseSkillTableColumnsParams) {
  function UpdateCell({
    cell,
    row,
  }: CellContext<Skill, unknown>): JSX.Element {
    return (
      <TablePseudoLink onClick={() => onUpdateClick(row)}>
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
        size: 150,
        accessorKey: "name",
        header: "Name",
        cell: UpdateCell,
      },
      {
        id: "category",
        label: "Category",
        size: 120,
        accessorFn: (row) => row.category?.name || "No Category",
        header: "Category",
        cell: UpdateCell,
      },
      {
        id: "subcategory",
        label: "Subcategory",
        size: 120,
        accessorFn: (row) => row.subcategory?.name || "None",
        header: "Subcategory",
        cell: UpdateCell,
      },
      {
        id: "comfort_level",
        label: "Comfort Level",
        size: 100,
        accessorKey: "comfort_level",
        header: "Comfort Level",
        cell: UpdateCell,
      },
      {
        id: "actions",
        label: "",
        size: 60,
        cell({ row }) {
          return (
            <Button
              className="w-[24px] h-[24px]"
              variant="destructive"
              size="icon"
              onClick={() => onDeleteClick(row)}
            >
              <Trash />
            </Button>
          );
        },
      },
    ] satisfies TableColumnDef<Skill>[];
  }, [onUpdateClick, onDeleteClick]);
}