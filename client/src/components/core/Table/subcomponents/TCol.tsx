import type { PropsWithChildren } from "react";

export interface TColProps extends PropsWithChildren {}

export function TCol({ children }: TColProps) {
  return <div className="p-2 py-1 flex items-center flex-1">{children}</div>;
}
