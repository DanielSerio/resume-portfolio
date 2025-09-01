import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ResumeSkillCardSkeleton() {
  return (
    <Card className="dark:bg-gray-900">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-24 mb-2" />
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <Skeleton className="h-2 w-full" />
          </div>
          <Skeleton className="h-5 w-10" />
        </div>
        <Skeleton className="h-4 w-16 mb-1" />
        <div className="flex flex-wrap flex-1 gap-2 mt-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}