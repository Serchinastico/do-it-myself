import { ColorSchemeBootstrap } from "@app/core/bootstrap/ColorSchemeBootstrap";
import { ErrorScreen } from "@app/core/components/Error";
import { navigationRef } from "@app/core/navigation/routes";
import { CloudBackupContextProvider } from "@app/core/providers/CloudBackupContextProvider";
import { DebugFileSystemProvider } from "@app/core/providers/DebugFileSystemProvider";
import { color } from "@app/core/theme/color";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { TelarContextProvider } from "@madeja-studio/telar";
import { NavigationContainer } from "@react-navigation/native";
import { PropsWithChildren, Suspense } from "react";
import { View } from "react-native";
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
              secondary: color.ash,
              tertiary: color.white,
            },
          },
        }}
      >
        {/* This Suspense view is required to load jotai async atoms without errors */}
        <Suspense fallback={<View />}>
          <ErrorBoundary FallbackComponent={ErrorScreen}>
            <CloudBackupContextProvider>
              <GestureHandlerRootView>
                <ColorSchemeBootstrap>
                  <PreloadScreen>
                    <NavigationContainer ref={navigationRef}>
                      <I18nProvider i18n={i18n}>{children}</I18nProvider>
                    </NavigationContainer>
                  </PreloadScreen>
                </ColorSchemeBootstrap>
              </GestureHandlerRootView>
            </CloudBackupContextProvider>
          </ErrorBoundary>
        </Suspense>
      </TelarContextProvider>
    </DebugFileSystemProvider>
  );
};

export default AllProviders;
