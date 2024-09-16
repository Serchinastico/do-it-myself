import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, useCallback, useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import useAsyncEffect from "use-async-effect";

interface Props extends PropsWithChildren {}

const PreloadScreen = ({ children }: Props) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const initialize = useCallback(async () => {
    /**
     * Preload fonts, configure dayjs and warm caches.
     * Whatever is needed to launch the app in good terms.
     */

    setAppIsReady(true);
  }, []);

  useAsyncEffect(initialize, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={tw`flex-1`}>
      {children}
    </View>
  );
};

export default PreloadScreen;
