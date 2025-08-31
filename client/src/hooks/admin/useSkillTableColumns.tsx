import { TablePseudoLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import type { TableColumnDef } from "@/lib/types/table.types";
import type { CellContext, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, type JSX } from "react";
import type { useSkillsList } from "../resume";

type Skill = NonNullable<ReturnType<typeof useSkillsList>["data"]>[number];

export interface UseSkillTableColumnsParams {
  onUpdateClick: (row: Row<Skill>) => void;
  onDeleteClick: (row: Row<Skill>) => void;
}

export function useSkillTableColumns({
  onUpdateClick,
  onDeleteClick,
}: UseSkillTableColumnsParams) {
  function UpdateCell({ cell, row }: CellContext<Skill, unknown>): JSX.Element {
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
        size: 60,
        accessorKey: "id",
        header: "ID",
        cell: UpdateCell,
      },
      {
        id: "name",
        label: "Name",
        size: 60,
        accessorKey: "name",
        header: "Name",
        cell: UpdateCell,
      },
      {
        id: "category",
        label: "Category",
        size: 60,
        accessorFn: (row) => row.category?.name || "No Category",
        header: "Category",
        cell: UpdateCell,
      },
      {
        id: "subcategory",
        label: "Subcategory",
        size: 60,
        accessorFn: (row) => row.subcategory?.name || "None",
        header: "Subcategory",
        cell: UpdateCell,
      },
      {
        id: "comfort_level",
        label: "Comfort",
        size: 60,
        accessorKey: "comfort_level",
        header: "Comfort",
        cell: UpdateCell,
      },
      {
        id: "actions",
        label: "",
        size: 60,
        cell({ row }) {
          return (
            <Button
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
    ] satisfies TableColumnDef<Skill>[];
  }, [onUpdateClick, onDeleteClick]);
}
