import { Page } from "@/components/layout/Page";
import { ResumeSection } from "@/components/layout/resume/ResumeSection";
import { Brain, SquareStar } from "lucide-react";

export function ResumePage() {
  return (
    <Page>
      <ResumeSection icon={Brain} id="skills" title="Skills">
        <h2>Skills Filtering</h2>
        <h2>Skills List</h2>
      </ResumeSection>
      <ResumeSection icon={SquareStar} id="showcase" title="Showcase Links">
        <h2>Showcase Links</h2>
      </ResumeSection>
    </Page>
  );
}
