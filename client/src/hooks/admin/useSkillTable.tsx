import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import type { useSkillsList } from "../resume";

function useSkillTableColumns() {
  return useMemo(() => {
    return [];
  }, []);
}

export interface UseSkillTableParams {
  query: ReturnType<typeof useSkillsList>;
}

type Data = NonNullable<ReturnType<typeof useSkillsList>["data"]>[number];

const BLANK_DATA = [] as Data[];

export function useSkillTable({ query }: UseSkillTableParams) {
  const columns = useSkillTableColumns();
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
