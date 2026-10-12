import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import registryJson from "@/registry.json";

export type RegistryKind = "block" | "component";

export interface RegistryEntry {
  kind: RegistryKind;
  slug: string;
  title: string;
  description: string;
  category: string;
  dependencies: string[];
}

export interface RegistryKindConfig {
  kind: RegistryKind;
  route: string;
  label: string;
  heading: string;
  description: string;
  category: string;
  emptyState: string;
}

export const REGISTRY_KINDS: Record<RegistryKind, RegistryKindConfig> = {
  block: {
    category: "UI Block",
    description: "Beautifully designed, open-source blocks",
    emptyState: "No blocks published yet.",
    heading: "blocks.",
    kind: "block",
    label: "Blocks",
    route: ROUTES.BLOCKS,
  },
  component: {
    category: "UI Component",
    description: "Beautifully designed, open-source components",
    emptyState: "No components published yet.",
    heading: "components.",
    kind: "component",
    label: "Components",
    route: ROUTES.COMPONENTS,
  },
};

const KIND_BY_TYPE: Record<string, RegistryKind> = {
  "registry:block": "block",
  "registry:component": "component",
};

interface RawRegistryItem {
  categories?: string[];
  dependencies?: string[];
  description?: string;
  name: string;
  title?: string;
  type: string;
}

const REGISTRY_ENTRIES: readonly RegistryEntry[] = (
  registryJson.items as RawRegistryItem[]
).flatMap((item) => {
  const kind = KIND_BY_TYPE[item.type];

  if (!kind) {
    return [];
  }

  return [
    {
      category: item.categories?.[0] ?? kind,
      dependencies: item.dependencies ?? [],
      description: item.description ?? "",
      kind,
      slug: item.name,
      title: item.title ?? item.name,
    },
  ];
});

export const getRegistryEntries = (kind: RegistryKind): RegistryEntry[] =>
  REGISTRY_ENTRIES.filter((entry) => entry.kind === kind);

export const getRegistryEntryBySlug = (
  kind: RegistryKind,
  slug: string
): RegistryEntry | undefined =>
  REGISTRY_ENTRIES.find((entry) => entry.kind === kind && entry.slug === slug);

export const getRegistryEntrySlugs = (kind: RegistryKind): string[] =>
  getRegistryEntries(kind).map((entry) => entry.slug);

export const registryEntryHref = (entry: RegistryEntry): string =>
  `${REGISTRY_KINDS[entry.kind].route}/${entry.slug}`;

export const registryInstallCommand = (slug: string): string =>
  `npx shadcn@latest add "${SITE.URL}/r/${slug}.json"`;

export const registryPromptText = (slug: string): string =>
  `Add the @ruthui/${slug} component to my project.`;
