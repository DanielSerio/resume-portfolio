import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

function SearchFieldComponent(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return <Input type="search" ref={ref} {...props} />;
}

export const SearchField = forwardRef(SearchFieldComponent);
