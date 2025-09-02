import { Button } from "@/components/ui/button";
import type { PropsWithChildren } from "react";

interface TablePseudoLinkProps
  extends PropsWithChildren<{ onClick: () => void }> {}

export const TablePseudoLink = ({
  children,
  onClick,
  ...props
}: TablePseudoLinkProps) => {
  return (
    <Button variant="link" size="sm" onClick={onClick} {...props}>
      {children}
    </Button>
  );
};
