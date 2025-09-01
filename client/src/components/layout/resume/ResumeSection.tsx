import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import type { AreaHTMLAttributes, ReactNode } from "react";

export interface ResumeSectionProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "title" | "id"> {
  title: string;
  id: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  renderToolbar?: () => ReactNode;
}

export function ResumeSection({
  title,
  id,
  className,
  icon: Icon,
  renderToolbar,
  children,
  ...props
}: ResumeSectionProps) {
  return (
    <section id={id} className={cn("flex flex-col my-8", className)} {...props}>
      <div className="sticky top-[320px] md:top-[150px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
        <div className="flex gap-x-4 items-center justify-between px-6 py-2">
          <div className="flex gap-x-4 items-center">
            <Icon opacity={0.4} className="mt-1" />
            <h1 className="text-4xl font-light">{title}</h1>
          </div>
          {renderToolbar?.()}
        </div>

        <Separator />
      </div>

      <div className="flex flex-col px-12 py-4">{children}</div>
    </section>
  );
}
