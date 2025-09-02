import type { RowData, Table } from "@tanstack/react-table";

export interface TableProps<TableRowData extends RowData> {
  table: Table<TableRowData>;
  gridTemplateColumns: string;
  isLoading?: boolean;
  error?: Error | null;
  testId: string;
}