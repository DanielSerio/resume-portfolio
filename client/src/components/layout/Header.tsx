import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { Contrast } from "lucide-react";
import { useTheme } from "../ui/theme-provider";

export interface HeaderProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "id"> {}

export function Header({ children, className, ...props }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const classNames = cn(
    "bg-background sticky top-0 z-50 w-full border-b",
    className
  );
  return (
    <header id="header" className={classNames} {...props}>
      <section className="flex h-full-w-full px-2 py-2 items-center">
        <div className="flex-1">{children}</div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-3"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Contrast />
        </Button>
      </section>
    </header>
  );
}
