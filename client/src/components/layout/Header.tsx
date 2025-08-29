import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";

export interface HeaderProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "id"> {}

export function Header({ children, className, ...props }: HeaderProps) {
  const classNames = cn("bg-background sticky top-0 z-50 w-full", className);
  return (
    <header id="header" className={classNames} {...props}>
      {children}
    </header>
  );
}
