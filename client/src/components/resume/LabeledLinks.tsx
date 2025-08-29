import type { PropsWithChildren } from "react";

function Link({ href, text }: { text: string; href: string }) {
  return (
    <a className="text-sm text-primary underline" href={href}>
      {text}
    </a>
  );
}

function Label({ children }: PropsWithChildren) {
  return <span className="label">{children}</span>;
}

function LabeledLink({ children }: PropsWithChildren) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "8ch 1fr" }}>
      {children}
    </div>
  );
}

function LabeledLinks({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-y-1 mb-8 sm:mb-0">{children}</div>;
}

LabeledLinks.LabeledLink = LabeledLink;
LabeledLinks.Link = Link;
LabeledLinks.Label = Label;
export { LabeledLinks };
