import { cn } from "@/lib/utils";
import { forwardRef, type AreaHTMLAttributes, type ForwardedRef } from "react";

export interface PageProps
  extends Omit<AreaHTMLAttributes<HTMLAreaElement>, "id"> {
  center?: boolean;
}

const PageComponent = (
  { className, children, center, ...props }: PageProps,
  ref?: ForwardedRef<HTMLAreaElement>
) => {
  const classNames = cn(center ? `grid place-content-center` : null, className);

  return (
    <main id="page" className={classNames} ref={ref} {...props}>
      {children}
    </main>
  );
};

export const Page = forwardRef(PageComponent);
