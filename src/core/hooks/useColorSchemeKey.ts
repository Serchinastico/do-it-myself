import { useRootNavigation } from "@app/core/navigation/routes";
import { useEffect, useState } from "react";

/**
 * Custom hook that manages and synchronizes the color scheme key with the
 * navigation focus events.
 *
 * This hook fixes an issue in twrnc that prevents some screen from updating
 * their color scheme when they are present in the stack already.
 *
 * {@link https://github.com/jaredh159/tailwind-react-native-classnames/issues/112}
 *
 * @returns The current color scheme key. This is meant to be used as the main
 * component key to force a re-render when the memoBuster property changes.
 *
 * @example
 * function MyComponent() {
 *   const colorSchemeKey = useColorSchemeKey();
 *   return <View key={colorSchemeKey}>{...}</View>;
 * }
 */
export const useColorSchemeKey = () => {
  const [colorSchemeKey, setColorSchemeKey] = useState(tw.memoBuster);
  const navigation = useRootNavigation();

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setColorSchemeKey(tw.memoBuster);
    });
  }, [tw.memoBuster]);

  return colorSchemeKey;
};
