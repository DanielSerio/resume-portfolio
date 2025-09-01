import type { SkillObject, useGroupedSkillsList } from "@/hooks/resume";
import { ResumeSkillCard } from "./ResumeSkillCard";
import { ResumeSkillsListSkeleton } from "./ResumeSkillsListSkeleton";
import { Fragment } from "react/jsx-runtime";

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
  if (skillsListQuery.isLoading) {
    return <ResumeSkillsListSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      {!!skillsListQuery.data &&
        Object.entries(skillsListQuery.data!).map(
          ([categoryId, subcategoryGroup]) => {
            const category = getCategory(subcategoryGroup);
            return (
              <div key={categoryId} className="w-full max-w-7xl mx-auto gap-4">
                <h1 className="text-2xl">{category?.name ?? "Misc"}</h1>

                <hr className="mt-2 mb-4" />

                {Object.entries(subcategoryGroup).map(
                  ([subcategoryId, skills]) => {
                    if (skills.length === 0) {
                      return (
                        <Fragment key={`${categoryId}:${subcategoryId}`} />
                      );
                    }

                    const subcategory = getSubcategory(skills);

                    return (
                      <div
                        className="bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800 border rounded-lg p-4 my-4"
                        key={`${categoryId}:${subcategoryId}`}
                      >
                        <h2 className="text-lg text-center font-semibold text-muted-foreground mb-6">
                          {subcategory?.name ?? "Misc"}
                        </h2>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
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
