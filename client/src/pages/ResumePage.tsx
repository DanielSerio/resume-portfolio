import { Page } from "@/components/layout/Page";
import { ResumeSection } from "@/components/layout/resume/ResumeSection";
import { ResumeSkillCardList } from "@/components/resume";
import { useGroupedSkillsList } from "@/hooks/resume";
import type { Client } from "@/main";
import { Brain, SquareStar } from "lucide-react";

export function ResumePage({ supabase }: { supabase: Client }) {
  const skillsListQuery = useGroupedSkillsList(supabase);

  return (
    <Page>
      <ResumeSection icon={Brain} id="skills" title="Skills">
        <ResumeSkillCardList skillsListQuery={skillsListQuery} />
      </ResumeSection>
      <ResumeSection icon={SquareStar} id="showcase" title="Showcase Links">
        <h2>Showcase Links</h2>
      </ResumeSection>
    </Page>
  );
}
