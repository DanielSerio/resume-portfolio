import type { SkillObject, useGroupedSkillsList } from "@/hooks/resume";
import { ResumeSkillCard } from "./ResumeSkillCard";

function getCategory(subcategoryGroup: Record<string, SkillObject[]>) {
  return Object.values(subcategoryGroup).flat()[0].category;
}

function getSubcategory(skills: SkillObject[]) {
  return skills[0]?.subcategory ?? null;
}

export function ResumeSkillCardList({
  skillsListQuery,
}: {
  skillsListQuery: ReturnType<typeof useGroupedSkillsList>;
}) {
  return (
    <div className="flex flex-col gap-4">
      {!!skillsListQuery.data &&
        Object.entries(skillsListQuery.data!).map(
          ([categoryId, subcategoryGroup]) => {
            const category = getCategory(subcategoryGroup);
            return (
              <div key={categoryId} className="w-full max-w-7xl mx-auto">
                <h1 className="text-2xl">{category?.name ?? "Misc"}</h1>

                <hr className="mt-2 mb-4" />

                {Object.entries(subcategoryGroup).map(
                  ([subcategoryId, skills]) => {
                    if (skills.length === 0) {
                      return <></>;
                    }

                    const subcategory = getSubcategory(skills);

                    return (
                      <div
                        className="bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800 border rounded-lg p-4"
                        key={subcategoryId}
                      >
                        <h2 className="text-lg text-center font-semibold text-muted-foreground mb-6">
                          {subcategory?.name ?? "Misc"}
                        </h2>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3">
                          {skills.map((skill) => (
                            <ResumeSkillCard key={skill.id} skill={skill} />
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          }
        )}
    </div>
  );
}
