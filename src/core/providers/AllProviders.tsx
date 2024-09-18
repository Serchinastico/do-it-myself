import { color } from "@app/core/theme/color";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { TelarContextProvider } from "@madeja-studio/telar";
import { NavigationContainer } from "@react-navigation/native";
import { PropsWithChildren } from "react";

import PreloadScreen from "../bootstrap/PreloadScreen";

interface Props extends PropsWithChildren {}

const AllProviders = ({ children }: Props) => {
  return (
    <TelarContextProvider
      theme={{
        core: {
          color: {
            primary: color.primary,
            secondary: color.secondary,
            tertiary: color.white,
          },
        },
      }}
    >
      <PreloadScreen>
        <NavigationContainer>
          <I18nProvider i18n={i18n}>{children}</I18nProvider>
        </NavigationContainer>
      </PreloadScreen>
    </TelarContextProvider>
  );
};

export default AllProviders;
