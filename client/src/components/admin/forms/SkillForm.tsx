import type { Skill } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";
import { CreateSkillForm } from "./CreateSkillForm";
import { UpdateSkillForm } from "./UpdateSkillForm";
import { DeleteSkillForm } from "./DeleteSkillForm";

export interface SkillFormProps {
  mode: "create" | "update" | "delete";
  skill?: Skill;
  onSuccess: () => void;
  onCancel?: () => void;
}

export function SkillForm({
  mode,
  skill,
  onSuccess,
  onCancel,
}: SkillFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  if (mode === "create") {
    return (
      <CreateSkillForm onCancel={onCancel} onSuccess={onSuccess} />
    );
  }

  if (mode === "update" && skill) {
    return (
      <UpdateSkillForm
        skill={skill}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  if (mode === "delete" && skill) {
    return (
      <DeleteSkillForm
        skill={skill}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  return null;
}
