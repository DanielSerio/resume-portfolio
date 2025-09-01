import { Page } from "@/components/layout/Page";
import { ResumeSection } from "@/components/layout/resume/ResumeSection";
import { ResumeFilters, ResumeSkillCardList } from "@/components/resume";
import { useGroupedSkillsList } from "@/hooks/resume";
import type { Client } from "@/main";
import { Brain } from "lucide-react";

export function ResumePage({ supabase }: { supabase: Client }) {
  const skillsListQuery = useGroupedSkillsList(supabase);

  return (
    <Page>
      <ResumeSection
        icon={Brain}
        id="skills"
        title="Skills"
        renderToolbar={() => <ResumeFilters />}
      >
        <ResumeSkillCardList skillsListQuery={skillsListQuery} />
      </ResumeSection>
    </Page>
  );
}
