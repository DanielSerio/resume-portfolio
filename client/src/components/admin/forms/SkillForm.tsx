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
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateSkillForm,
  useUpdateSkillForm,
  useDeleteSkillForm,
} from "@/hooks/admin";
import { useCategoriesList, useSubcategoriesList } from "@/hooks/resume";
import type { Skill } from "@/lib/schemas";
import type { Client } from "@/main";
import { useRouteContext } from "@tanstack/react-router";

export interface SkillFormProps {
  mode: "create" | "update" | "delete";
  skill?: Skill;
  onCancel?: () => void;
}

export function SkillForm({ mode, skill, onCancel }: SkillFormProps) {
  const { supabase } = useRouteContext({ from: "/admin/skills" });

  if (mode === "create") {
    return <CreateSkillForm supabase={supabase} onCancel={onCancel} />;
  }

  if (mode === "update" && skill) {
    return (
      <UpdateSkillForm supabase={supabase} skill={skill} onCancel={onCancel} />
    );
  }

  if (mode === "delete" && skill) {
    return <DeleteSkillForm skill={skill} onCancel={onCancel} />;
  }

  return null;
}

function CreateSkillForm({
  supabase,
  onCancel,
}: {
  supabase: Client;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } = useCreateSkillForm();
  const categoriesQuery = useCategoriesList(supabase);
  const subcategoriesQuery = useSubcategoriesList(supabase);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter skill name"
                  {...field}
                  value={field.value || ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(categoriesQuery.data ?? []).map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subcategory_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory (Optional)</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value === "none" ? null : value)
                }
                value={field.value || "none"}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No subcategory</SelectItem>
                  {(subcategoriesQuery.data ?? []).map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comfort_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comfort Level: {field.value || 1}/100</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[field.value || 1]}
                  onValueChange={(value) => field.onChange(value[0])}
                  disabled={isLoading}
                  className="w-full"
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
            {isLoading ? "Creating..." : "Create Skill"}
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

function UpdateSkillForm({
  supabase,
  skill,
  onCancel,
}: {
  supabase: Client;
  skill: Skill;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } = useUpdateSkillForm(skill);
  const categoriesQuery = useCategoriesList(supabase);
  const subcategoriesQuery = useSubcategoriesList(supabase);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter skill name"
                  {...field}
                  value={field.value || ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoriesQuery.data?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subcategory_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory (Optional)</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value === "none" ? null : value)
                }
                value={field.value || "none"}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No subcategory</SelectItem>
                  {subcategoriesQuery.data?.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comfort_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comfort Level: {field.value || 1}/100</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[field.value || 1]}
                  onValueChange={(value) => field.onChange(value[0])}
                  disabled={isLoading}
                  className="w-full"
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
            {isLoading ? "Updating..." : "Update Skill"}
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

function DeleteSkillForm({
  skill,
  onCancel,
}: {
  skill: Skill;
  onCancel?: () => void;
}) {
  const { form, handleSubmit, isLoading, error } = useDeleteSkillForm(skill);

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
