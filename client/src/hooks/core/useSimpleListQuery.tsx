import type { Database, Tables } from "@/lib/types/database.types";
import type { Client } from "@/main";
import { useQuery } from "@tanstack/react-query";

type TableName = keyof Database["public"]["Tables"];

interface GetSimpleListQueryFnParams<
  TTableName extends TableName,
  TSelect extends string,
> {
  supabase: Client;
  from: TTableName;
  select: TSelect;
}

const getQueryFn = <TTableName extends TableName, TSelect extends string>({
  supabase,
  from,
  select,
}: GetSimpleListQueryFnParams<TTableName, TSelect>) => {
  return async function query() {
    const { data, error } = await supabase.from(from).select(select);

    if (error) {
      throw error;
    }

    return data;
  };
};

export interface UseSimpleListQueryParams<
  TTableName extends TableName,
  TSelect extends string,
> extends GetSimpleListQueryFnParams<TTableName, TSelect> {
  queryKey: string[];
}

export function useSimpleListQuery<
  TTableName extends TableName,
  TSelect extends string,
>({ queryKey, ...props }: UseSimpleListQueryParams<TTableName, TSelect>) {
  const queryFn = getQueryFn({
    ...props,
  });

  return useQuery({
    queryKey,
    queryFn,
  });
}
