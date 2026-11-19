export type SectionId =
  | "blocks"
  | "components"
  | "contact"
  | "crafts"
  | "experience"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "skills"
  | "uses"
  | "stats";

export type NavGroupId = "extras" | "ui" | "work";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}

export interface NavGroup {
  id: NavGroupId;
  label: string;
  items: NavItem[];
}
