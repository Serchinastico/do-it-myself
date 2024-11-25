import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const PROJECT_COLORS = [
  { getName: () => t(i18n)`Wheat`, hex: "#F0C75D", id: `Wheat` },
  { getName: () => t(i18n)`Clay`, hex: "#D6A16F", id: `Clay` },
  { getName: () => t(i18n)`Grass`, hex: "#0FB185", id: `Grass` },
  { getName: () => t(i18n)`Lime`, hex: "#8CC173", id: `Lime` },
  { getName: () => t(i18n)`Lily`, hex: "#6D95FD", id: `Lily` },
  { getName: () => t(i18n)`Sky`, hex: "#5DCCF0", id: `Sky` },
  { getName: () => t(i18n)`Ocean`, hex: "#9298B7", id: `Ocean` },
  { getName: () => t(i18n)`Fuchsia`, hex: "#E179D0", id: `Fuchsia` },
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number];
export type ProjectColorId = ProjectColor["id"];

export const getProjectColorById = (colorId: ProjectColorId): ProjectColor =>
  PROJECT_COLORS.find((color) => color.id === colorId)!;
