import type { RowData } from "@tanstack/react-table";
import type { TableColumnDef } from "../types/table.types";


/**
 * Calculates the total width and grid template columns for a table based on the provided column 
 * definitions.
 * @param {TableColumnDef<TableRowData, TValue>[]} columns - The `columns` parameter is an array of
 * column definitions. Each column definition contains information about the size of the column and
 * possibly other properties related to the column in a table.
 * @returns The `getTableRowProps` function returns an object with two properties:
 * 1. `totalWidth`: The total width calculated by summing up the sizes of all columns in the provided
 * array.
 * 2. `gridTemplateColumns`: A string representing the CSS grid template columns property based on the
 * sizes of the columns in the provided array.
 */
export function getTableRowSizeProps<TableRowData extends RowData, TValue = unknown>(columns: TableColumnDef<TableRowData, TValue>[]) {
  const totalWidth = columns.reduce((sum, colDef) => sum + colDef.size, 0);
  const gridTemplateColumns = columns.reduce((templateString, colDef) => {
    const percent = (colDef.size / totalWidth) * 100;
    return `${templateString} ${percent}%`;
  }, '').trimStart();

  return {
    totalWidth,
    gridTemplateColumns
  };
}