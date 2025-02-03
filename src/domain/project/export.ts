import { i18n } from "@lingui/core";

export const ExportTheme = {
  dim: {
    getPreview: () => require("@assets/img/dim_theme_light.png"),
    name: i18n._(`Do It Myself`),
  },
  dimDark: {
    getPreview: () => require("@assets/img/dim_theme_dark.png"),
    name: i18n._(`Do It Myself (Dark)`),
  },
  sweden: {
    getPreview: () => require("@assets/img/sweden_theme_light.png"),
    name: i18n._(`Sweden`),
  },
  swedenDark: {
    getPreview: () => require("@assets/img/sweden_theme_dark.png"),
    name: i18n._(`Sweden (Dark)`),
  },
} as const;

export type ExportThemeId = keyof typeof ExportTheme;
