import { Page } from "@/components/layout/Page";
import { ResumeSection } from "@/components/layout/resume/ResumeSection";
import { useSkillsList } from "@/hooks/resume";
import type { Client } from "@/main";
import { Brain, SquareStar } from "lucide-react";

export function ResumePage({ supabase }: { supabase: Client }) {
  const skillsListQuery = useSkillsList(supabase);

  console.info(skillsListQuery.data);

  //red%20hawk%20technologies%2C%20llc
  //dock411%2C%20llc
  //accumedix%2C%20inc

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
