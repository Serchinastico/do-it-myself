import { t } from "@lingui/core/macro";
import { ColorSchemeName } from "react-native";

export type ColorScheme = NonNullable<ColorSchemeName>;

export const getNameFromColorScheme = (scheme: ColorScheme) => {
  switch (scheme) {
    case "dark":
      return t`Dark`;
    case "light":
      return t`Light`;
  }
};
