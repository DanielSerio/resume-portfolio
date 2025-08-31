import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateEmployerExperienceForm,
  useUpdateEmployerExperienceForm,
  useDeleteEmployerExperienceForm,
} from "@/hooks/admin";
import { useSkillsList } from "@/hooks/resume";
import type { EmployerExperience } from "@/lib/schemas";
import type { Client } from "@/main";
import { useRouteContext } from "@tanstack/react-router";
import { useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

export interface EmployerExperienceFormProps {
  mode: "create" | "update" | "delete";
  employerExperience?: EmployerExperience;
  onCancel?: () => void;
}

export function EmployerExperienceForm({ mode, employerExperience, onCancel }: EmployerExperienceFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/employer-experiences" });

  if (mode === "create") {
    return <CreateEmployerExperienceForm supabase={supabase} onCancel={onCancel} />;
  }

  if (mode === "update" && employerExperience) {
    return <UpdateEmployerExperienceForm supabase={supabase} employerExperience={employerExperience} onCancel={onCancel} />;
  }

  if (mode === "delete" && employerExperience) {
    return <DeleteEmployerExperienceForm employerExperience={employerExperience} onCancel={onCancel} />;
  }

  return null;
}

function CreateEmployerExperienceForm({ supabase, onCancel }: { supabase: Client; onCancel?: () => void }) {
  const { form, handleSubmit, isLoading, error } = useCreateEmployerExperienceForm();
  const skillsQuery = useSkillsList(supabase);
  
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills"
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer Experience Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter employer experience name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Skills</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSkill({ id: "" })}
              disabled={isLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
          
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3 p-3 border rounded">
              <FormField
                control={form.control}
                name={`skills.${index}.id`}
                render={({ field: selectField }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={selectField.onChange}
                      value={selectField.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(skillsQuery.data ?? []).map((skill) => (
                          <SelectItem key={skill.id} value={skill.id}>
                            {skill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {error.message}
          </div>
        )}

        <div className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Employer Experience"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

function UpdateEmployerExperienceForm({
  supabase,
  employerExperience,
  onCancel,
}: {
  supabase: Client;
  employerExperience: EmployerExperience;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useUpdateEmployerExperienceForm(employerExperience);
  const skillsQuery = useSkillsList(supabase);
  
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills"
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer Experience Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter employer experience name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Skills</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSkill({ id: "" })}
              disabled={isLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
          
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3 p-3 border rounded">
              <FormField
                control={form.control}
                name={`skills.${index}.id`}
                render={({ field: selectField }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={selectField.onChange}
                      value={selectField.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(skillsQuery.data ?? []).map((skill) => (
                          <SelectItem key={skill.id} value={skill.id}>
                            {skill.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {error.message}
          </div>
        )}

        <div className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Employer Experience"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

function DeleteEmployerExperienceForm({
  employerExperience,
  onCancel,
}: {
  employerExperience: EmployerExperience;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useDeleteEmployerExperienceForm(employerExperience);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-red-50 rounded-md">
          <div className="text-red-800 font-medium mb-2">
            Delete Employer Experience: {employerExperience.name}
          </div>
          <div className="text-red-700 text-sm">
            This action cannot be undone. This will permanently delete the
            employer experience and may affect related skills.
          </div>
        </div>

        <FormField
          control={form.control}
          name="confirmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type "{employerExperience.name}" to confirm deletion
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={`Type "${employerExperience.name}" here`}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {error.message}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? "Deleting..." : "Delete Employer Experience"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}