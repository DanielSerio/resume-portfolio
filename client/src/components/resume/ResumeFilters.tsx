import {
  Cog,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from "lucide-react";
import { SearchField } from "../core";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  useResumeFilters,
  useFilterOptions,
  type ResumeCollapsedState,
  type ResumeFilterState,
  type ResumeSortOption,
} from "@/hooks/resume";
import { useState } from "react";
import { toast } from "sonner";
import type { Client } from "@/main";

export function ResumeFilters({ supabase }: { supabase: Client }) {
  const [
    { selectedFilters, appliedFilters, collapsed },
    { setSelectedFilters, setCollapsed, applyFilters, clearFilters },
  ] = useResumeFilters();

  const filterOptionsQuery = useFilterOptions(supabase);
  const [isApplying, setIsApplying] = useState(false);

  const totalAppliedFilters =
    appliedFilters.categories.length +
    appliedFilters.subcategories.length +
    appliedFilters.employers.length +
    (appliedFilters.sort.field !== "name" || appliedFilters.sort.direction !== "asc" ? 1 : 0);

  // Check for unapplied changes, excluding search since it applies immediately
  const selectedWithoutSearch = { ...selectedFilters, search: "" };
  const appliedWithoutSearch = { ...appliedFilters, search: "" };
  const hasUnappliedChanges = JSON.stringify(selectedWithoutSearch) !== JSON.stringify(appliedWithoutSearch);

  const toggleFilter = (
    type: keyof Pick<
      ResumeFilterState,
      "categories" | "subcategories" | "employers"
    >,
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const getSortIcon = () => {
    if (selectedFilters.sort.direction === "asc")
      return <ArrowUp className="w-4 h-4" />;
    if (selectedFilters.sort.direction === "desc")
      return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const handleApplyFilters = async () => {
    setIsApplying(true);
    try {
      applyFilters();
      toast.success("Filters applied successfully");
    } catch (error) {
      toast.error("Failed to apply filters. Please try again.");
      clearFilters();
      console.error('Filter application failed:', error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleClearFilters = async () => {
    setIsApplying(true);
    try {
      clearFilters();
      toast.success("Filters cleared");
    } catch (error) {
      toast.error("Failed to clear filters. Please try again.");
      clearFilters();
      console.error('Filter clearing failed:', error);
    } finally {
      setIsApplying(false);
    }
  };

  if (filterOptionsQuery.error) {
    toast.error("Failed to load filter options");
    return null;
  }

  const toggleCollapsed = (section: keyof ResumeCollapsedState) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const CollapsibleSection = ({
    title,
    section,
    children,
  }: {
    title: string;
    section: keyof ResumeCollapsedState;
    children: React.ReactNode;
  }) => (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer py-1"
        onClick={() => toggleCollapsed(section)}
      >
        <Label className="text-sm font-semibold">{title}</Label>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            collapsed[section] ? "rotate-180" : ""
          }`}
        />
      </div>
      {!collapsed[section] && <div className="mt-2">{children}</div>}
    </div>
  );

  return (
    <div className="flex gap-x-2">
      <SearchField
        placeholder="Search Skills..."
        value={selectedFilters.search}
        onChange={(e) =>
          setSelectedFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className={`relative ${hasUnappliedChanges ? 'border-orange-500 bg-orange-50' : ''}`}
          >
            {totalAppliedFilters > 0 && (
              <Badge className="absolute py-0 px-1 top-0 right-0 translate-x-[50%] translate-y-[-50%]">
                {totalAppliedFilters}
              </Badge>
            )}
            {hasUnappliedChanges && (
              <div className="absolute w-2 h-2 bg-orange-500 rounded-full top-1 left-1" />
            )}
            <Cog />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={22}
          className="w-80 max-h-[80vh] flex flex-col"
        >
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Sorting Section */}
            <div>
              <Label className="text-sm font-semibold">Sort By</Label>
              <div className="flex gap-2 mt-2">
                <Select
                  value={selectedFilters.sort.field}
                  onValueChange={(value: ResumeSortOption) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      sort: { ...prev.sort, field: value },
                    }))
                  }
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="comfort_level">Comfort Level</SelectItem>
                    <SelectItem value="last_updated_at">
                      Last Updated
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      sort: {
                        ...prev.sort,
                        direction:
                          prev.sort.direction === "asc" ? "desc" : "asc",
                      },
                    }))
                  }
                >
                  {getSortIcon()}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Categories Filter */}
            <CollapsibleSection title="Categories" section="categories">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filterOptionsQuery.isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading categories...</div>
                ) : (
                  filterOptionsQuery.data?.categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedFilters.categories.includes(category.id)}
                        onCheckedChange={() =>
                          toggleFilter("categories", category.id)
                        }
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleSection>

            <Separator />

            {/* Subcategories Filter */}
            <CollapsibleSection title="Subcategories" section="subcategories">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filterOptionsQuery.isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading subcategories...</div>
                ) : (
                  filterOptionsQuery.data?.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`subcategory-${subcategory.id}`}
                        checked={selectedFilters.subcategories.includes(subcategory.id)}
                        onCheckedChange={() =>
                          toggleFilter("subcategories", subcategory.id)
                        }
                      />
                      <Label
                        htmlFor={`subcategory-${subcategory.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {subcategory.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleSection>

            <Separator />

            {/* Employers Filter */}
            <CollapsibleSection title="Employers" section="employers">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filterOptionsQuery.isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading employers...</div>
                ) : (
                  filterOptionsQuery.data?.employers.map((employer) => (
                    <div key={employer.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`employer-${employer.id}`}
                        checked={selectedFilters.employers.includes(employer.id)}
                        onCheckedChange={() =>
                          toggleFilter("employers", employer.id)
                        }
                      />
                      <Label
                        htmlFor={`employer-${employer.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {employer.name}
                      </Label>
                    </div>
                  ))
                )}
              </div>
            </CollapsibleSection>
          </div>

          {/* Fixed Actions Footer */}
          <div className="border-t pt-3 mt-3 flex-shrink-0">
            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                disabled={isApplying}
              >
                {isApplying ? "Clearing..." : "Clear Filters"}
              </Button>
              <PopoverClose asChild>
                <Button 
                  size="sm" 
                  onClick={handleApplyFilters}
                  disabled={isApplying}
                  className={hasUnappliedChanges ? 'bg-orange-600 hover:bg-orange-700' : ''}
                >
                  {isApplying ? "Applying..." : "Apply Filters"}
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
