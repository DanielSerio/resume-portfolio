import { flexRender, type RowData } from "@tanstack/react-table";
import type { TableProps } from "./Table.props";
import { TableError } from "./subcomponents/TableError";
import { TRow } from "./subcomponents/TRow";
import { TCol } from "./subcomponents/TCol";

export function Table<TableRowData extends RowData>({
  table,
  isLoading,
  error,
  gridTemplateColumns,
}: TableProps<TableRowData>) {
  if (error) {
    return <TableError error={error} />;
  }

  return (
    <div className="relative text-sm">
      <div className="w-full">
        <div>
          {table.getHeaderGroups().map((headerGroup) => (
            <TRow
              header
              key={headerGroup.id}
              gridTemplateColumns={gridTemplateColumns}
            >
              {headerGroup.headers.map((header) => (
                <TCol key={header.id}>
                  <div className="h-6 font-medium text-muted-foreground">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TCol>
              ))}
            </TRow>
          ))}
        </div>
        <div>
          {isLoading ? (
            <TRow gridTemplateColumns={gridTemplateColumns}>
              <TCol>
                <div className="h-24 flex items-center justify-center w-full">
                  Loading...
                </div>
              </TCol>
            </TRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TRow key={row.id} gridTemplateColumns={gridTemplateColumns}>
                {row.getVisibleCells().map((cell) => (
                  <TCol key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TCol>
                ))}
              </TRow>
            ))
          ) : (
            <TRow gridTemplateColumns={"1fr"}>
              <TCol>
                <div className="h-24 flex items-center justify-center w-full">
                  No results.
                </div>
              </TCol>
            </TRow>
          )}
        </div>
      </div>
    </div>
  );
}
