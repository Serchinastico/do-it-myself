import { t } from "@lingui/macro";

export const PROJECT_COLORS = [
  { hex: "#F0C75D", id: `Wheat`, name: t`Wheat` },
  { hex: "#D6A16F", id: `Clay`, name: t`Clay` },
  { hex: "#0FB185", id: `Grass`, name: t`Grass` },
  { hex: "#8CC173", id: `Lime`, name: t`Lime` },
  { hex: "#6D95FD", id: `Lily`, name: t`Lily` },
  { hex: "#5DCCF0", id: `Sky`, name: t`Sky` },
  { hex: "#9298B7", id: `Ocean`, name: t`Ocean` },
  { hex: "#E179D0", id: `Fuchsia`, name: t`Fuchsia` },
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number];
export type ProjectColorId = ProjectColor["id"];

export const getProjectColorById = (colorId: ProjectColorId): ProjectColor =>
  PROJECT_COLORS.find((color) => color.id === colorId)!;
