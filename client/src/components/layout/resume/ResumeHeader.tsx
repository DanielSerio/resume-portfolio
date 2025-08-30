import { LabeledLinks } from "@/components/resume";
import { Header } from "../Header";
import { Badge } from "@/components/ui/badge";

function TextLabeledLink({
  label,
  link,
}: {
  label: string;
  link: { text: string; href: string };
}) {
  return (
    <LabeledLinks.LabeledLink>
      <LabeledLinks.Label>
        <Badge variant="outline" className="min-h-5 bg-white text-black">
          {label}
        </Badge>
      </LabeledLinks.Label>
      <LabeledLinks.Link text={link.text} href={link.href} />
    </LabeledLinks.LabeledLink>
  );
}

function ImageLabeledLink({
  imgSrc,
  link,
  title,
}: {
  imgSrc: string;
  title?: string;
  link: { text: string; href: string };
}) {
  return (
    <LabeledLinks.LabeledLink>
      <LabeledLinks.Label>
        <Badge
          variant="outline"
          className="min-h-5 max-w-8 bg-white text-black"
          title={title}
        >
          <img src={imgSrc} />
        </Badge>
      </LabeledLinks.Label>
      <LabeledLinks.Link text={link.text} href={link.href} />
    </LabeledLinks.LabeledLink>
  );
}

export function ResumeHeader() {
  const email = "dserio.d@gmail.com";
  const linkedin = "https://www.linkedin.com/in/dan-serio-22a99644/";
  const github = "https://github.com/DanielSerio";
  const site = "https://danielserio.github.io/danserio/";

  return (
    <Header>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="px-4 mt-6 mb-10 sm:my-0 text-center">
          <h1 className="text-5xl font-light mb-0" style={{ letterSpacing: 2 }}>
            Dan Serio
          </h1>
          <small className="text-muted-foreground">
            Senior Front-end Software Engineer
          </small>
        </div>

        <LabeledLinks>
          <TextLabeledLink
            label="Phone"
            link={{
              text: "(847)370.5271",
              href: "tel:+18473705271",
            }}
          />
          <TextLabeledLink
            label="Email"
            link={{
              text: email,
              href: `mailto:${email}`,
            }}
          />
          <ImageLabeledLink
            title="Github"
            imgSrc="github.png"
            link={{
              text: github,
              href: github,
            }}
          />
          <TextLabeledLink
            label="Site"
            link={{
              text: site,
              href: site,
            }}
          />
          <ImageLabeledLink
            title="Linkedin"
            imgSrc="linkedin.png"
            link={{
              text: linkedin,
              href: linkedin,
            }}
          />
        </LabeledLinks>
      </div>
    </Header>
  );
}
