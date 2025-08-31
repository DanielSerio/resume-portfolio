import type { SkillObject } from "@/hooks/resume";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

export function ResumeSkillCard({ skill }: { skill: SkillObject }) {
  return (
    <Card className="dark:bg-gray-900">
      <CardHeader>
        <CardTitle>{skill.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <small className="font-semibold text-muted-foreground">
          Comfort Level
        </small>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <Progress value={skill.comfort_level} max={100} />
          </div>
          <Badge variant="secondary">{skill.comfort_level}%</Badge>
        </div>
        <small className="font-semibold text-muted-foreground">Used at</small>
        <div className="flex flex-wrap flex-1 gap-2 mt-1">
          {skill.employer_experience.map(
            ({ name, employer_experience_id: id }) => {
              return (
                <Badge variant="outline" key={id}>
                  {name}
                </Badge>
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
}
