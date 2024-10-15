import { atoms } from "@app/core/storage/state";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { useDeviceContext } from "twrnc";

interface Props extends PropsWithChildren {}

export const ColorSchemeBootstrap = ({ children }: Props) => {
  const colorScheme = useAtomValue(atoms.colorScheme);

  useDeviceContext(tw, {
    initialColorScheme: colorScheme ?? `device`,
    observeDeviceColorSchemeChanges: false,
  });

  return <>{children}</>;
};
