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

interface Methods {
  onSuccess: () => void;
  onCancel?: () => void;
}

export interface CategoryFormProps extends Methods {
  mode: "create" | "update" | "delete";
  category?: SkillCategory;
}

export function CategoryForm({
  mode,
  category,
  onSuccess,
  onCancel,
}: CategoryFormProps) {
  if (mode === "create") {
    return <CreateCategoryForm onCancel={onCancel} onSuccess={onSuccess} />;
  }

  if (mode === "update" && category) {
    return (
      <UpdateCategoryForm
        category={category}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  if (mode === "delete" && category) {
    return (
      <DeleteCategoryForm
        category={category}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  return null;
}

function CreateCategoryForm({ onCancel, onSuccess }: Methods) {
  const { form, handleSubmit, isLoading, error } = useCreateSkillCategoryForm({
    onSuccess,
  });

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
          <Button
            data-testid="save-category-button"
            className="flex-1"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Category"}
          </Button>
          {onCancel && (
            <Button
              data-testid="cancel-edit-button"
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

interface EntityMethods extends Methods {
  category: SkillCategory;
}

function UpdateCategoryForm({ category, onSuccess, onCancel }: EntityMethods) {
  const { form, handleSubmit, isLoading, error } = useUpdateSkillCategoryForm(
    category,
    { onSuccess }
  );

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
          <Button
            data-testid="save-category-button"
            type="submit"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Category"}
          </Button>
          {onCancel && (
            <Button
              data-testid="cancel-edit-button"
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

function DeleteCategoryForm({ category, onSuccess, onCancel }: EntityMethods) {
  const { form, handleSubmit, isLoading, error } = useDeleteSkillCategoryForm(
    category,
    { onSuccess }
  );

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
                  data-testid="category-delete-input"
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
            data-testid="category-delete-button"
            type="submit"
            className="flex-1"
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? "Deleting..." : "Delete Category"}
          </Button>
          {onCancel && (
            <Button
              data-testid="cancel-edit-button"
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
