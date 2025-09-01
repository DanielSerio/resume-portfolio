import { Cog, ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
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
import { useState } from "react";

type SortOption = "name" | "comfort_level" | "last_updated_at";
type SortDirection = "asc" | "desc";

interface FilterState {
  search: string;
  sort: {
    field: SortOption;
    direction: SortDirection;
  };
  categories: string[];
  subcategories: string[];
  employers: string[];
}

interface CollapsedState {
  categories: boolean;
  subcategories: boolean;
  employers: boolean;
}

export function ResumeFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sort: {
      field: "name",
      direction: "asc",
    },
    categories: [],
    subcategories: [],
    employers: [],
  });

  const [collapsed, setCollapsed] = useState<CollapsedState>({
    categories: false,
    subcategories: true,
    employers: true,
  });

  const totalActiveFilters = 
    filters.categories.length + 
    filters.subcategories.length + 
    filters.employers.length +
    (filters.sort.field !== "name" || filters.sort.direction !== "asc" ? 1 : 0);

  const toggleFilter = (type: keyof Pick<FilterState, "categories" | "subcategories" | "employers">, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const getSortIcon = () => {
    if (filters.sort.direction === "asc") return <ArrowUp className="w-4 h-4" />;
    if (filters.sort.direction === "desc") return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const toggleCollapsed = (section: keyof CollapsedState) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const CollapsibleSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof CollapsedState; 
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
      {!collapsed[section] && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-x-2">
      <SearchField 
        placeholder="Search Skills..." 
        value={filters.search}
        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            {totalActiveFilters > 0 && (
              <Badge className="absolute py-0 px-1 top-0 right-0 translate-x-[50%] translate-y-[-50%]">
                {totalActiveFilters}
              </Badge>
            )}
            <Cog />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={22} className="w-80 max-h-[80vh] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {/* Sorting Section */}
            <div>
              <Label className="text-sm font-semibold">Sort By</Label>
              <div className="flex gap-2 mt-2">
                <Select
                  value={filters.sort.field}
                  onValueChange={(value: SortOption) =>
                    setFilters(prev => ({ ...prev, sort: { ...prev.sort, field: value } }))
                  }
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="comfort_level">Comfort Level</SelectItem>
                    <SelectItem value="last_updated_at">Last Updated</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      sort: {
                        ...prev.sort,
                        direction: prev.sort.direction === "asc" ? "desc" : "asc"
                      }
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
                {/* Mock categories - in real implementation, these would come from API */}
                {["Programming Languages", "Frameworks", "Tools", "Databases"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleFilter("categories", category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <Separator />

            {/* Subcategories Filter */}
            <CollapsibleSection title="Subcategories" section="subcategories">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {/* Mock subcategories */}
                {["Frontend", "Backend", "Mobile", "DevOps"].map((subcategory) => (
                  <div key={subcategory} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subcategory-${subcategory}`}
                      checked={filters.subcategories.includes(subcategory)}
                      onCheckedChange={() => toggleFilter("subcategories", subcategory)}
                    />
                    <Label 
                      htmlFor={`subcategory-${subcategory}`}
                      className="text-sm cursor-pointer"
                    >
                      {subcategory}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <Separator />

            {/* Employers Filter */}
            <CollapsibleSection title="Employers" section="employers">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {/* Mock employers */}
                {["Company A", "Company B", "Freelance", "Personal Projects"].map((employer) => (
                  <div key={employer} className="flex items-center space-x-2">
                    <Checkbox
                      id={`employer-${employer}`}
                      checked={filters.employers.includes(employer)}
                      onCheckedChange={() => toggleFilter("employers", employer)}
                    />
                    <Label 
                      htmlFor={`employer-${employer}`}
                      className="text-sm cursor-pointer"
                    >
                      {employer}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

          </div>
          
          {/* Fixed Actions Footer */}
          <div className="border-t pt-3 mt-3 flex-shrink-0">
            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({
                  search: "",
                  sort: { field: "name", direction: "asc" },
                  categories: [],
                  subcategories: [],
                  employers: [],
                })}
              >
                Clear All
              </Button>
              <PopoverClose asChild>
                <Button size="sm">Apply Filters</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
