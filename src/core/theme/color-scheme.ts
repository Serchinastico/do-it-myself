import { i18n } from "@lingui/core";
import { ColorSchemeName } from "react-native";

export type ColorScheme = NonNullable<ColorSchemeName>;

export const getNameFromColorScheme = (scheme: ColorScheme) => {
  switch (scheme) {
    case "dark":
      return i18n._(`Dark`);
    case "light":
      return i18n._(`Light`);
  }
};
