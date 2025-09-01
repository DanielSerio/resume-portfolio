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
import { useDeleteSkillForm } from "@/hooks/admin";
import type { Skill } from "@/lib/schemas";

interface DeleteSkillFormProps {
  skill: Skill;
  onSuccess: () => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

export function DeleteSkillForm({
  skill,
  onSuccess,
  onError,
  onCancel,
}: DeleteSkillFormProps) {
  const { form, handleSubmit, isLoading, error } = useDeleteSkillForm(skill, {
    onSuccess,
    onError,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-red-50 rounded-md">
          <div className="text-red-800 font-medium mb-2">
            Delete Skill: {skill.name || skill.id}
          </div>
          <div className="text-red-700 text-sm">
            This action cannot be undone. This will permanently delete the
            skill.
          </div>
        </div>

        <FormField
          control={form.control}
          name="confirmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type "{skill.name || skill.id}" to confirm deletion
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={`Type "${skill.name || skill.id}" here`}
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
            {isLoading ? "Deleting..." : "Delete Skill"}
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