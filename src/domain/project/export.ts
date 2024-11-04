import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const ExportTheme = {
  dim: {
    getPreview: () => require("@assets/img/dim-theme.png"),
    name: t(i18n)`Do It Myself`,
  },
  sweden: {
    getPreview: () => require("@assets/img/sweden-theme.png"),
    name: t(i18n)`Sweden`,
  },
} as const;

export type ExportThemeId = keyof typeof ExportTheme;

export const Layout = {
  landscape2pages: {
    getPreview: () => require("@assets/img/landscape-2pages-layout.png"),
    name: t(i18n)`Landscape - 2 pages`,
  },
  portrait: {
    getPreview: () => require("@assets/img/portrait-layout.png"),
    name: t(i18n)`Portrait`,
  },
} as const;

export type LayoutId = keyof typeof Layout;
