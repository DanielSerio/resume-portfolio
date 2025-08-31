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
  onCancel?: () => void;
}

export function SubcategoryForm({ mode, subcategory, onCancel }: SubcategoryFormProps) {
  if (mode === "create") {
    return <CreateSubcategoryForm onCancel={onCancel} />;
  }

  if (mode === "update" && subcategory) {
    return <UpdateSubcategoryForm subcategory={subcategory} onCancel={onCancel} />;
  }

  if (mode === "delete" && subcategory) {
    return <DeleteSubcategoryForm subcategory={subcategory} onCancel={onCancel} />;
  }

  return null;
}

function CreateSubcategoryForm({ onCancel }: { onCancel?: () => void }) {
  const { form, handleSubmit, isLoading, error } = useCreateSkillSubcategoryForm();

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
          <Button type="submit" disabled={isLoading}>
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

function UpdateSubcategoryForm({
  subcategory,
  onCancel,
}: {
  subcategory: SkillSubcategory;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useUpdateSkillSubcategoryForm(subcategory);

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
          <Button type="submit" disabled={isLoading}>
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
  onCancel,
}: {
  subcategory: SkillSubcategory;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } =
    useDeleteSkillSubcategoryForm(subcategory);

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
          <Button type="submit" disabled={isLoading} variant="destructive">
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