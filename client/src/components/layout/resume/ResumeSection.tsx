import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AreaHTMLAttributes } from "react";

export interface ResumeSectionProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "title" | "id"> {
  title: string;
  id: string;
}

export function ResumeSection({
  title,
  id,
  className,
  children,
  ...props
}: ResumeSectionProps) {
  return (
    <section id={id} className={cn("flex flex-col", className)} {...props}>
      <h1 className="text-4xl font-light px-6 py-2">{title}</h1>

      <Separator />

      <div className="flex flex-col px-12 py-4">{children}</div>
    </section>
  );
}
