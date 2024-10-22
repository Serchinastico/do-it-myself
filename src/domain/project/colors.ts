import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const PROJECT_COLORS = [
  { hex: "#F0C75D", id: `Wheat`, name: t(i18n)`Wheat` },
  { hex: "#D6A16F", id: `Clay`, name: t(i18n)`Clay` },
  { hex: "#0FB185", id: `Grass`, name: t(i18n)`Grass` },
  { hex: "#8CC173", id: `Lime`, name: t(i18n)`Lime` },
  { hex: "#6D95FD", id: `Lily`, name: t(i18n)`Lily` },
  { hex: "#5DCCF0", id: `Sky`, name: t(i18n)`Sky` },
  { hex: "#9298B7", id: `Ocean`, name: t(i18n)`Ocean` },
  { hex: "#E179D0", id: `Fuchsia`, name: t(i18n)`Fuchsia` },
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number];
export type ProjectColorId = ProjectColor["id"];

export const getProjectColorById = (colorId: ProjectColorId): ProjectColor =>
  PROJECT_COLORS.find((color) => color.id === colorId)!;
