import { TablePseudoLink } from "@/components/core";
import { Button } from "@/components/ui/button";
import type { SkillCategory } from "@/lib/schemas";
import type { TableColumnDef } from "@/lib/types/table.types";
import type { CellContext, Row } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useMemo, type JSX, type PropsWithChildren } from "react";

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
    ] satisfies TableColumnDef<SkillCategory>[];
  }, [onUpdateClick, onDeleteClick]);
}
