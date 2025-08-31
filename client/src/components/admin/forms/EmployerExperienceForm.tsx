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
  useCreateEmployerExperienceForm,
  useUpdateEmployerExperienceForm,
  useDeleteEmployerExperienceForm,
} from "@/hooks/admin";
import type { EmployerExperience } from "@/lib/schemas";

export interface EmployerExperienceFormProps {
  mode: "create" | "update" | "delete";
  employerExperience?: EmployerExperience;
  onCancel?: () => void;
}

export function EmployerExperienceForm({ mode, employerExperience, onCancel }: EmployerExperienceFormProps) {
  if (mode === "create") {
    return <CreateEmployerExperienceForm onCancel={onCancel} />;
  }

  if (mode === "update" && employerExperience) {
    return <UpdateEmployerExperienceForm employerExperience={employerExperience} onCancel={onCancel} />;
  }

  if (mode === "delete" && employerExperience) {
    return <DeleteEmployerExperienceForm employerExperience={employerExperience} onCancel={onCancel} />;
  }

  return null;
}

function CreateEmployerExperienceForm({ onCancel }: { onCancel?: () => void }) {
  const { form, handleSubmit, isLoading, error } = useCreateEmployerExperienceForm();

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
  employerExperience,
  onCancel,
}: {
  employerExperience: EmployerExperience;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useUpdateEmployerExperienceForm(employerExperience);

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