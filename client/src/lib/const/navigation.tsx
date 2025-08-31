import { Blocks, Brain, Grid2X2, Briefcase } from "lucide-react";
import type { ReactNode } from "react";

interface NavItem {
  title: string;
  url: string;
  icon: () => ReactNode;
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Skills",
    url: "/admin/skills",
    icon: () => <Brain />,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: () => <Grid2X2 />,
  },
  {
    title: "Subcategories",
    url: "/admin/subcategories",
    icon: () => <Blocks />,
  },
  {
    title: "Employer Experiences",
    url: "/admin/employer-experiences",
    icon: () => <Briefcase />,
  },
];
