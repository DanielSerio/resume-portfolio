import { Page } from "@/components/layout/Page";
import { ResumeSkillsSection } from "@/components/resume/ResumeSkillsSection";
import { ResumeFiltersProvider } from "@/hooks/resume";
import type { Client } from "@/main";

export function ResumePage({ supabase }: { supabase: Client }) {
  return (
    <Page>
      <ResumeFiltersProvider>
        <ResumeSkillsSection supabase={supabase} />
      </ResumeFiltersProvider>
    </Page>
  );
}
