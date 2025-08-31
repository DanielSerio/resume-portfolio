import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import type { useSubcategoriesList } from "../resume";

function useSubcategoryTableColumns() {
  return useMemo(() => {
    return [];
  }, []);
}

export interface UseSubcategoryTableParams {
  query: ReturnType<typeof useSubcategoriesList>;
}

type Data = NonNullable<ReturnType<typeof useSubcategoriesList>["data"]>[number];

const BLANK_DATA = [] as Data[];

export function useSubcategoryTable({ query }: UseSubcategoryTableParams) {
  const columns = useSubcategoryTableColumns();
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