import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

export type ColumnAlign = 'left' | 'center' | 'right';

export type TableColumnDef<TableRowData extends RowData, TValue = unknown> = ColumnDef<TableRowData, TValue> & {
  size: number; // used to calculate the % value for grid-template-columns.
  id: string; // required for truly unique rows
  label: ReactNode; // required for collapsed state on small screens
  align?: ColumnAlign;
};