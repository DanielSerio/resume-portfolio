import { Skeleton } from "@/components/ui/skeleton";
import { TRow } from "./TRow";
import { TCol } from "./TCol";

export interface TableSkeletonProps {
  gridTemplateColumns: string;
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ 
  gridTemplateColumns, 
  rows = 5,
  columns = 3 
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TRow key={rowIndex} gridTemplateColumns={gridTemplateColumns}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TCol key={colIndex}>
              <Skeleton className="h-4 w-full" />
            </TCol>
          ))}
        </TRow>
      ))}
    </>
  );
}