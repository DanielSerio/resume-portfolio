import {
  getCoreRowModel,
  useReactTable,
  type Row,
} from "@tanstack/react-table";
import { useMemo } from "react";
import type { useSkillsList } from "../resume";
import { useSkillTableColumns } from "./useSkillTableColumns";
import { getTableRowSizeProps } from "@/lib/utils";

type Data = NonNullable<ReturnType<typeof useSkillsList>["data"]>[number];

export interface UseSkillTableParams {
  query: ReturnType<typeof useSkillsList>;
  onDeleteClick: (row: Row<Data>) => void;
  onUpdateClick: (row: Row<Data>) => void;
}

const BLANK_DATA = [] as Data[];

export function useSkillTable({
  query,
  onUpdateClick,
  onDeleteClick,
}: UseSkillTableParams) {
  const columns = useSkillTableColumns({
    onUpdateClick,
    onDeleteClick,
  });
  const data = useMemo(() => {
    if (!query.data) {
      return BLANK_DATA;
    }

    return query.data;
  }, [query.isLoading, query.data]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const visibleColumns = table.getVisibleFlatColumns();
  const columnDefs = useMemo(
    () =>
      columns.filter((def) => visibleColumns.some((col) => col.id === def.id)),
    [visibleColumns, columns]
  );
  const { totalWidth, gridTemplateColumns } = getTableRowSizeProps(columnDefs);

  return {
    table,
    totalWidth,
    gridTemplateColumns,
  };
}
