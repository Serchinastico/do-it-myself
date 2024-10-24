import { ColorSchemeBootstrap } from "@app/core/bootstrap/ColorSchemeBootstrap";
import { ErrorScreen } from "@app/core/components/Error";
import { DebugFileSystemProvider } from "@app/core/providers/DebugFileSystemProvider";
import { color } from "@app/core/theme/color";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          {/* This Suspense view is required to load jotai async atoms without errors */}
          <Suspense fallback={<View />}>
            <GestureHandlerRootView>
              <ColorSchemeBootstrap>
                <PreloadScreen>
                  <NavigationContainer>
                    <BottomSheetModalProvider>
                      <I18nProvider i18n={i18n}>{children}</I18nProvider>
                    </BottomSheetModalProvider>
                  </NavigationContainer>
                </PreloadScreen>
              </ColorSchemeBootstrap>
            </GestureHandlerRootView>
          </Suspense>
        </ErrorBoundary>
      </TelarContextProvider>
    </DebugFileSystemProvider>
  );
};

export default AllProviders;
