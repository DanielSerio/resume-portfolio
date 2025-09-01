import type { Skill } from "@/lib/schemas";
import { useRouteContext } from "@tanstack/react-router";
import { CreateSkillForm } from "./CreateSkillForm";
import { UpdateSkillForm } from "./UpdateSkillForm";
import { DeleteSkillForm } from "./DeleteSkillForm";

export interface SkillFormProps {
  mode: "create" | "update" | "delete";
  skill?: Skill;
  onSuccess: Record<"create" | "update" | "delete", () => void>;
  onError: Record<"create" | "update" | "delete", (error: Error) => void>;
  onCancel?: () => void;
}

export function SkillForm({
  mode,
  skill,
  onSuccess,
  onError,
  onCancel,
}: SkillFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  if (mode === "create") {
    return (
      <CreateSkillForm
        supabase={supabase}
        onSuccess={onSuccess.create}
        onError={onError.create}
        onCancel={onCancel}
      />
    );
  }

  if (mode === "update" && skill) {
    return (
      <UpdateSkillForm
        supabase={supabase}
        skill={skill}
        onSuccess={onSuccess.update}
        onError={onError.update}
        onCancel={onCancel}
      />
    );
  }

  if (mode === "delete" && skill) {
    return (
      <DeleteSkillForm
        skill={skill}
        onSuccess={onSuccess.delete}
        onError={onError.delete}
        onCancel={onCancel}
      />
    );
  }

  return null;
}
