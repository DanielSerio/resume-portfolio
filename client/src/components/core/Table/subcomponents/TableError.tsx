export interface TableErrorProps {
  error: Error;
}

export function TableError({ error }: TableErrorProps) {
  return (
    <div className="rounded-md border p-8 text-center">
      <div className="text-red-600 font-medium mb-2">Error loading data</div>
      <div className="text-sm text-muted-foreground">{error.message}</div>
    </div>
  );
}