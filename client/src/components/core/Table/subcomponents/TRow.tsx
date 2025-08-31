import type { PropsWithChildren } from "react";

export interface TRowProps extends PropsWithChildren {
  header?: boolean;
  gridTemplateColumns: string;
}

export function TRow({ children, header, gridTemplateColumns }: TRowProps) {
  return (
    <div
      className={`grid border-b transition-colors ${header ? "" : " hover:bg-muted/50"}`}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
}
