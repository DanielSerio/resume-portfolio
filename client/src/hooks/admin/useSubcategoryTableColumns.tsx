import { TablePseudoLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import type { SkillSubcategory } from "@/lib/schemas";
import type { TableColumnDef } from "@/lib/types/table.types";
import type { CellContext, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, type JSX } from "react";

export interface UseSubcategoryTableColumnsParams {
  onUpdateClick: (row: Row<SkillSubcategory>) => void;
  onDeleteClick: (row: Row<SkillSubcategory>) => void;
}

export function useSubcategoryTableColumns({
  onUpdateClick,
  onDeleteClick,
}: UseSubcategoryTableColumnsParams) {
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
            <TablePseudoLink onClick={() => onDeleteClick(row)}>
              <Button
                className="w-[24px] h-[24px]"
                variant="destructive"
                size="icon"
              >
                <Trash />
              </Button>
            </TablePseudoLink>
          );
        },
      },
    ] satisfies TableColumnDef<SkillSubcategory>[];
  }, [onUpdateClick, onDeleteClick]);
}