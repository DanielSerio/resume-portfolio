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
  onSuccess: () => void;
  onCancel?: () => void;
}

export function EmployerExperienceForm({
  mode,
  employerExperience,
  onSuccess,
  onCancel,
}: EmployerExperienceFormProps) {
  if (mode === "create") {
    return <CreateEmployerExperienceForm onCancel={onCancel} onSuccess={onSuccess} />;
  }

  if (mode === "update" && employerExperience) {
    return (
      <UpdateEmployerExperienceForm
        employerExperience={employerExperience}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  if (mode === "delete" && employerExperience) {
    return (
      <DeleteEmployerExperienceForm
        employerExperience={employerExperience}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  return null;
}

function CreateEmployerExperienceForm({ onCancel, onSuccess }: { onCancel?: () => void; onSuccess: () => void }) {
  const { form, handleSubmit, isLoading, error } =
    useCreateEmployerExperienceForm({ onSuccess });

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
                  data-testid="employer-name-input"
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
          <Button data-testid="save-employer-experience-button" type="submit" className="flex-1" disabled={isLoading}>
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
  onSuccess,
}: {
  employerExperience: EmployerExperience;
  onCancel?: () => void;
  onSuccess: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useUpdateEmployerExperienceForm(employerExperience, { onSuccess });

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
                  data-testid="employer-name-input"
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
          <Button data-testid="save-employer-experience-button" type="submit" className="flex-1" disabled={isLoading}>
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
  onSuccess,
}: {
  employerExperience: EmployerExperience;
  onCancel?: () => void;
  onSuccess: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useDeleteEmployerExperienceForm(employerExperience, { onSuccess });

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
                  data-testid="employer-experience-delete-input"
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
            data-testid="employer-experience-delete-button"
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
