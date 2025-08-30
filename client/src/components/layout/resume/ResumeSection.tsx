import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import type { AreaHTMLAttributes } from "react";

export interface ResumeSectionProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "title" | "id"> {
  title: string;
  id: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export function ResumeSection({
  title,
  id,
  className,
  icon: Icon,
  children,
  ...props
}: ResumeSectionProps) {
  return (
    <section id={id} className={cn("flex flex-col", className)} {...props}>
      <div className="flex gap-x-4 items-center px-6 py-2">
        <Icon opacity={0.4} className="mt-1" />
        <h1 className="text-4xl font-light ">{title}</h1>
      </div>

      <Separator />

      <div className="flex flex-col px-12 py-4">{children}</div>
    </section>
  );
}
