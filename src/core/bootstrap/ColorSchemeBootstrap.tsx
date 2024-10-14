import { PropsWithChildren } from "react";
import { useDeviceContext } from "twrnc";

interface Props extends PropsWithChildren {}

export const ColorSchemeBootstrap = ({ children }: Props) => {
  useDeviceContext(tw, {
    initialColorScheme: `device`,
    observeDeviceColorSchemeChanges: false,
  });

  return <>{children}</>;
};
