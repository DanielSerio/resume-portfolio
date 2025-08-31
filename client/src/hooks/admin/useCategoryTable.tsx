import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import type { useCategoriesList } from "../resume";
import { useCategoryTableColumns } from "./useCategoryTableColumns";
import { getTableRowSizeProps } from "@/lib/utils";

export interface UseCategoryTableParams {
  query: ReturnType<typeof useCategoriesList>;
}

type Data = NonNullable<ReturnType<typeof useCategoriesList>["data"]>[number];

const BLANK_DATA = [] as Data[];

export function useCategoryTable({ query }: UseCategoryTableParams) {
  const columns = useCategoryTableColumns();
  const data = useMemo(() => {
    if (!query.data) {
      return BLANK_DATA;
    }

    return query.data;
  }, [query.isLoading]);

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
