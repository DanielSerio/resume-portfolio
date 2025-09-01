import { Brain } from "lucide-react";
import { ResumeSection } from "../layout/resume/ResumeSection";
import { ResumeFilters } from "./ResumeFilters";
import { ResumeSkillCardList } from "./ResumeSkillCardList";
import type { Client } from "@/main";
import { useGroupedSkillsList, useResumeFilters } from "@/hooks/resume";

export function ResumeSkillsSection({ supabase }: { supabase: Client }) {
  const [{ appliedFilters }] = useResumeFilters();
  const skillsListQuery = useGroupedSkillsList(supabase, appliedFilters);

  return (
    <ResumeSection
      icon={Brain}
      id="skills"
      title="Skills"
      renderToolbar={() => <ResumeFilters supabase={supabase} />}
    >
      <ResumeSkillCardList skillsListQuery={skillsListQuery} />
    </ResumeSection>
  );
}
