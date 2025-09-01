import { Skeleton } from "../ui/skeleton";
import { ResumeSkillCardSkeleton } from "./ResumeSkillCardSkeleton";

export function ResumeSkillsListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Render 2-3 categories */}
      {Array.from({ length: 3 }).map((_, categoryIndex) => (
        <div key={categoryIndex} className="w-full max-w-7xl mx-auto gap-4">
          {/* Category title */}
          <Skeleton className="h-8 w-48 mb-2" />
          
          <hr className="mt-2 mb-4" />

          {/* Render 1-2 subcategories per category */}
          {Array.from({ length: categoryIndex === 0 ? 2 : 1 }).map((_, subcategoryIndex) => (
            <div
              className="bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800 border rounded-lg p-4 my-4"
              key={`${categoryIndex}:${subcategoryIndex}`}
            >
              {/* Subcategory title */}
              <Skeleton className="h-6 w-32 mx-auto mb-6" />
              
              {/* Grid of skill cards */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, skillIndex) => (
                  <ResumeSkillCardSkeleton key={skillIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}