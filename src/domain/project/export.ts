import { ColorScheme } from "@app/core/theme/color-scheme";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const ExportTheme = {
  dim: {
    getPreview: () => require("@assets/img/dim_theme_light.png"),
    name: t(i18n)`Do It Myself`,
  },
  dimDark: {
    getPreview: () => require("@assets/img/dim_theme_dark.png"),
    name: t(i18n)`Do It Myself (Dark)`,
  },
  sweden: {
    getPreview: () => require("@assets/img/sweden_theme_light.png"),
    name: t(i18n)`Sweden`,
  },
  swedenDark: {
    getPreview: () => require("@assets/img/sweden_theme_dark.png"),
    name: t(i18n)`Sweden (Dark)`,
  },
} as const;

export type ExportThemeId = keyof typeof ExportTheme;

export const Layout = {
  landscape2pages: {
    getPreview: (colorScheme: ColorScheme) =>
      colorScheme === "light"
        ? require("@assets/img/landscape_2pages_layout_light.png")
        : require("@assets/img/landscape_2pages_layout_dark.png"),
    name: t(i18n)`Landscape - 2 pages`,
  },
  portrait: {
    getPreview: (colorScheme: ColorScheme) =>
      colorScheme === "light"
        ? require("@assets/img/portrait_layout_light.png")
        : require("@assets/img/portrait_layout_dark.png"),
    name: t(i18n)`Portrait`,
  },
} as const;

export type LayoutId = keyof typeof Layout;
