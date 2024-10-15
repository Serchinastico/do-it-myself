import { atoms } from "@app/core/storage/state";
import { useAtomValue } from "jotai";
import { PropsWithChildren, useEffect } from "react";
import { StatusBar } from "react-native";
import { useDeviceContext } from "twrnc";

interface Props extends PropsWithChildren {}

export const ColorSchemeBootstrap = ({ children }: Props) => {
  const colorScheme = useAtomValue(atoms.colorScheme);

  useDeviceContext(tw, {
    initialColorScheme: colorScheme ?? `device`,
    observeDeviceColorSchemeChanges: false,
  });

  useEffect(() => {
    StatusBar.setBarStyle(
      colorScheme === "dark" ? "light-content" : "dark-content",
      true
    );
  }, [colorScheme]);

  return <>{children}</>;
};
