import { atoms } from "@app/core/storage/state";
import dayjs from "dayjs";
import { useLocales } from "expo-localization";
import * as SplashScreen from "expo-splash-screen";
import { useAtomValue, useSetAtom } from "jotai";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { EmitterSubscription, Platform, View } from "react-native";
import {
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getAvailablePurchases,
  initConnection,
  ProductPurchase,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  SubscriptionPurchase,
} from "react-native-iap";
import { useAppColorScheme } from "twrnc";
import useAsyncEffect from "use-async-effect";

interface Props extends PropsWithChildren {}

const PreloadScreen = ({ children }: Props) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const locales = useLocales();
  const [, , setTwColorScheme] = useAppColorScheme(tw);
  const setHasPurchasedApp = useSetAtom(atoms.hasPurchasedApp);
  const colorScheme = useAtomValue(atoms.colorScheme);

  // Warm the storage
  useAtomValue(atoms.hasSeenOnboarding);

  useEffect(() => {
    setTwColorScheme(colorScheme);
  }, [colorScheme]);

  const initialize = useCallback(async () => {
    /**
     * Preload fonts, configure dayjs and warm caches.
     * Whatever is needed to launch the app in good terms.
     */
    dayjs.locale(locales[0].languageCode ?? "es");

    setAppIsReady(true);
  }, []);

  useAsyncEffect(initialize, []);

  useAsyncEffect(async () => {
    let updateListener: EmitterSubscription;
    let errorListener: EmitterSubscription;

    await initConnection();

    try {
      const history = await getAvailablePurchases({
        onlyIncludeActiveItems: true,
      });
      setHasPurchasedApp(history.length > 0);
    } catch {
      setHasPurchasedApp(false);
    }

    try {
      if (Platform.OS === "android") {
        // we make sure that "ghost" pending payment are removed
        // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
        try {
          await flushFailedPurchasesCachedAsPendingAndroid();
        } catch {}
      }

      updateListener = purchaseUpdatedListener(
        async (purchase: ProductPurchase | SubscriptionPurchase) => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            await finishTransaction({ isConsumable: false, purchase });
          }
        }
      );

      errorListener = purchaseErrorListener((error: PurchaseError) => {
        console.warn("purchaseErrorListener", error);
      });
    } catch (error) {
      console.error(error);
    }

    return () => {
      updateListener?.remove();
      errorListener?.remove();
    };
  }, []);

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
