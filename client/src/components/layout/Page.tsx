import { cn } from "@/lib/utils";
import { forwardRef, type AreaHTMLAttributes, type ForwardedRef } from "react";

export interface PageProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "id"> {}

const PageComponent = (
  { className, children, ...props }: PageProps,
  ref?: ForwardedRef<HTMLAreaElement>
) => {
  const classNames = cn(className);

  return (
    <main id="page" className={classNames} ref={ref} {...props}>
      {children}
    </main>
  );
};

export const Page = forwardRef(PageComponent);
