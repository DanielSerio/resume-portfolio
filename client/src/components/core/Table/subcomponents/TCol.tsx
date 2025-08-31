import type { PropsWithChildren } from "react";

export interface TColProps extends PropsWithChildren {}

export function TCol({ children }: TColProps) {
  return <div className="p-4 flex items-center flex-1">{children}</div>;
}
