import { i18n } from "@lingui/core";

export const PROJECT_COLORS = [
  { getName: () => i18n._(`Wheat`), hex: "#F0C75D", id: `Wheat` },
  { getName: () => i18n._(`Clay`), hex: "#D6A16F", id: `Clay` },
  { getName: () => i18n._(`Grass`), hex: "#0FB185", id: `Grass` },
  { getName: () => i18n._(`Lime`), hex: "#8CC173", id: `Lime` },
  { getName: () => i18n._(`Lily`), hex: "#6D95FD", id: `Lily` },
  { getName: () => i18n._(`Sky`), hex: "#5DCCF0", id: `Sky` },
  { getName: () => i18n._(`Ocean`), hex: "#9298B7", id: `Ocean` },
  { getName: () => i18n._(`Fuchsia`), hex: "#E179D0", id: `Fuchsia` },
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number];
export type ProjectColorId = ProjectColor["id"];

export const getProjectColorById = (colorId: ProjectColorId): ProjectColor =>
  PROJECT_COLORS.find((color) => color.id === colorId)!;
