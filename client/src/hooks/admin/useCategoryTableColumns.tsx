import type { SkillCategory } from "@/lib/schemas";
import type { TableColumnDef } from "@/lib/types/table.types";
import { useMemo } from "react";

export function useCategoryTableColumns() {
  return useMemo(() => {
    return [
      {
        id: "id",
        label: "ID",
        size: 96,
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "name",
        label: "Name",
        size: 96 * 2,
        accessorKey: "name",
        header: "Name",
      },
    ] satisfies TableColumnDef<SkillCategory>[];
  }, []);
}
