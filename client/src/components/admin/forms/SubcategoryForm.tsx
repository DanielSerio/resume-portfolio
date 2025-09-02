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
  useCreateSkillSubcategoryForm,
  useUpdateSkillSubcategoryForm,
  useDeleteSkillSubcategoryForm,
} from "@/hooks/admin";
import type { SkillSubcategory } from "@/lib/schemas";

export interface SubcategoryFormProps {
  mode: "create" | "update" | "delete";
  subcategory?: SkillSubcategory;
  onSuccess: () => void;
  onCancel?: () => void;
}

export function SubcategoryForm({
  mode,
  subcategory,
  onSuccess,
  onCancel,
}: SubcategoryFormProps) {
  if (mode === "create") {
    return <CreateSubcategoryForm onCancel={onCancel} onSuccess={onSuccess} />;
  }

  if (mode === "update" && subcategory) {
    return (
      <UpdateSubcategoryForm
        subcategory={subcategory}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  if (mode === "delete" && subcategory) {
    return (
      <DeleteSubcategoryForm
        subcategory={subcategory}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  return null;
}

interface Methods {
  onCancel?: () => void;
  onSuccess: () => void;
}

function CreateSubcategoryForm({ onCancel, onSuccess }: Methods) {
  const { form, handleSubmit, isLoading, error } =
    useCreateSkillSubcategoryForm({ onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory Name</FormLabel>
              <FormControl>
                <Input
                  data-testid="subcategory-name-input"
                  placeholder="Enter subcategory name"
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
            data-testid="save-subcategory-button"
          >
            {isLoading ? "Creating..." : "Create Subcategory"}
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

interface WithEntityMethods extends Methods {
  subcategory: SkillSubcategory;
}

function UpdateSubcategoryForm({
  subcategory,
  onSuccess,
  onCancel,
}: WithEntityMethods) {
  const { form, handleSubmit, isLoading, error } =
    useUpdateSkillSubcategoryForm(subcategory, { onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory Name</FormLabel>
              <FormControl>
                <Input
                  data-testid="subcategory-name-input"
                  placeholder="Enter subcategory name"
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
            data-testid="save-subcategory-button"
          >
            {isLoading ? "Updating..." : "Update Subcategory"}
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

function DeleteSubcategoryForm({
  subcategory,
  onSuccess,
  onCancel,
}: WithEntityMethods) {
  const { form, handleSubmit, isLoading, error } =
    useDeleteSkillSubcategoryForm(subcategory, { onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-red-50 rounded-md">
          <div className="text-red-800 font-medium mb-2">
            Delete Subcategory: {subcategory.name}
          </div>
          <div className="text-red-700 text-sm">
            This action cannot be undone. This will permanently delete the
            subcategory and may affect related skills.
          </div>
        </div>

        <FormField
          control={form.control}
          name="confirmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Type "{subcategory.name}" to confirm deletion
              </FormLabel>
              <FormControl>
                <Input
                  data-testid="subcategory-delete-input"
                  placeholder={`Type "${subcategory.name}" here`}
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
            data-testid="subcategory-delete-button"
          >
            {isLoading ? "Deleting..." : "Delete Subcategory"}
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
