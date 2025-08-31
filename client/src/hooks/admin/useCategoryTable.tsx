import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import type { useCategoriesList } from "../resume";

function useCategoryTableColumns() {
  return useMemo(() => {
    return [];
  }, []);
}

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

  return useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
}
