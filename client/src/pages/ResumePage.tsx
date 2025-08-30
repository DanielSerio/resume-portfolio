import { Page } from "@/components/layout/Page";
import { ResumeSection } from "@/components/layout/resume/ResumeSection";

export function ResumePage() {
  return (
    <Page>
      <ResumeSection id="skills" title="Skills">
        <h2>Skills Filtering</h2>
        <h2>Skills List</h2>
      </ResumeSection>
      <ResumeSection id="showcase" title="Showcase Links">
        <h2>Showcase Links</h2>
      </ResumeSection>
    </Page>
  );
}
