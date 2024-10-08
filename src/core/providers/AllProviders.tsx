import { ErrorScreen } from "@app/core/components/Error";
import { DebugFileSystemProvider } from "@app/core/providers/DebugFileSystemProvider";
import { color } from "@app/core/theme/color";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { TelarContextProvider } from "@madeja-studio/telar";
import { NavigationContainer } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import ErrorBoundary from "react-native-error-boundary";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import PreloadScreen from "../bootstrap/PreloadScreen";

interface Props extends PropsWithChildren {}

const AllProviders = ({ children }: Props) => {
  return (
    <DebugFileSystemProvider>
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
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <GestureHandlerRootView>
            <PreloadScreen>
              <NavigationContainer>
                <I18nProvider i18n={i18n}>{children}</I18nProvider>
              </NavigationContainer>
            </PreloadScreen>
          </GestureHandlerRootView>
        </ErrorBoundary>
      </TelarContextProvider>
    </DebugFileSystemProvider>
  );
};

export default AllProviders;
