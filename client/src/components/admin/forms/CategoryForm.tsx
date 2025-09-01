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
  useCreateSkillCategoryForm,
  useUpdateSkillCategoryForm,
  useDeleteSkillCategoryForm,
} from "@/hooks/admin";
import type { SkillCategory } from "@/lib/schemas";

export interface CategoryFormProps {
  mode: "create" | "update" | "delete";
  category?: SkillCategory;
  onCancel?: () => void;
}

export function CategoryForm({ mode, category, onCancel }: CategoryFormProps) {
  if (mode === "create") {
    return <CreateCategoryForm onCancel={onCancel} />;
  }

  if (mode === "update" && category) {
    return <UpdateCategoryForm category={category} onCancel={onCancel} />;
  }

  if (mode === "delete" && category) {
    return <DeleteCategoryForm category={category} onCancel={onCancel} />;
  }

  return null;
}

function CreateCategoryForm({ onCancel }: { onCancel?: () => void }) {
  const { form, handleSubmit, isLoading, error } = useCreateSkillCategoryForm();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  data-testid="category-name-input"
                  placeholder="Enter category name"
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
          <Button data-testid="save-category-button" className="flex-1" type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
          {onCancel && (
            <Button data-testid="cancel-edit-button" type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

function UpdateCategoryForm({
  category,
  onCancel,
}: {
  category: SkillCategory;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useUpdateSkillCategoryForm(category);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  data-testid="category-name-input"
                  placeholder="Enter category name"
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
          <Button data-testid="save-category-button" type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Category"}
          </Button>
          {onCancel && (
            <Button data-testid="cancel-edit-button" type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

function DeleteCategoryForm({
  category,
  onCancel,
}: {
  category: SkillCategory;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useDeleteSkillCategoryForm(category);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 bg-red-50 rounded-md">
          <div className="text-red-800 font-medium mb-2">
            Delete Category: {category.name}
          </div>
          <div className="text-red-700 text-sm">
            This action cannot be undone. This will permanently delete the
            category and may affect related skills.
          </div>
        </div>

        <FormField
          control={form.control}
          name="confirmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type "{category.name}" to confirm deletion</FormLabel>
              <FormControl>
                <Input
                  data-testid="confirm-delete-input"
                  placeholder={`Type "${category.name}" here`}
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
            data-testid="confirm-delete-button"
            type="submit"
            className="flex-1"
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? "Deleting..." : "Delete Category"}
          </Button>
          {onCancel && (
            <Button data-testid="cancel-edit-button" type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
