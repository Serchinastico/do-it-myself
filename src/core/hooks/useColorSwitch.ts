import { color } from "@app/core/theme/color";
import { useCallback } from "react";
import { useAppColorScheme } from "twrnc";

type ThemeColor = keyof typeof color;
type SwitchColor = ({} & string) | ThemeColor | undefined;

interface Props {
  dark: SwitchColor;
  light: SwitchColor;
}

const isThemeColor = (switchColor: SwitchColor): switchColor is ThemeColor =>
  !!switchColor && Object.hasOwn(color, switchColor);

/**
 * Resolves the provided color name to its corresponding color value if it exists in the theme colors;
 * otherwise, returns the provided color as it is.
 *
 * @param switchColor - The color name to be resolved.
 * @returns The resolved color value if it exists in the theme colors, otherwise the provided color name.
 *
 * @example
 * const themeColor = resolve('primary');
 * console.log(themeColor); // Outputs the value of color['primary']
 *
 * const customColor = resolve('#ff0000');
 * console.log(customColor); // Outputs '#ff0000' since it is not a predefined theme color
 */
const resolve = (switchColor: SwitchColor) => {
  if (isThemeColor(switchColor)) {
    return color[switchColor];
  } else {
    return switchColor;
  }
};

export const useColorSwitch = () => {
  const [colorScheme] = useAppColorScheme(tw);

  return Object.assign(
    useCallback(
      ({ dark, light }: Props) => {
        return colorScheme === "dark" ? resolve(dark) : resolve(light);
      },
      [colorScheme]
    ),
    { colorScheme }
  );
};
