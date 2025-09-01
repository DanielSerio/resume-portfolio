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
import { useUpdateSkillForm } from "@/hooks/admin";
import {
  useCategoriesList,
  useSubcategoriesList,
  useEmployerExperiencesList,
} from "@/hooks/resume";
import type { Skill } from "@/lib/schemas";
import type { Client } from "@/main";
import { useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

interface UpdateSkillFormProps {
  supabase: Client;
  skill: Skill;
  onSuccess: () => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

export function UpdateSkillForm({
  supabase,
  skill,
  onSuccess,
  onError,
  onCancel,
}: UpdateSkillFormProps) {
  const { form, handleSubmit, isLoading, error } = useUpdateSkillForm(skill, {
    onSuccess,
    onError,
  });
  const categoriesQuery = useCategoriesList(supabase);
  const subcategoriesQuery = useSubcategoriesList(supabase);
  const employerExperiencesQuery = useEmployerExperiencesList(supabase);

  const {
    fields: employerExperienceFields,
    append: appendEmployerExperience,
    remove: removeEmployerExperience,
  } = useFieldArray({
    control: form.control,
    name: "employer_experience",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 h-[86svh] flex flex-col flex-1 relative"
      >
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

        <div className="space-y-4 flex-1 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <FormLabel>Employer Experiences</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendEmployerExperience({
                  employer_experience_id: "",
                })
              }
              disabled={isLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>

          {employerExperienceFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3 p-3 border rounded"
            >
              <FormField
                control={form.control}
                name={`employer_experience.${index}.employer_experience_id`}
                render={({ field: selectField }) => (
                  <FormItem className="flex-1">
                    <Select
                      onValueChange={selectField.onChange}
                      value={selectField.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employer experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(employerExperiencesQuery.data ?? []).map(
                          (experience) => (
                            <SelectItem
                              key={experience.id}
                              value={experience.id}
                            >
                              {experience.name}
                            </SelectItem>
                          )
                        )}
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
                onClick={() => removeEmployerExperience(index)}
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