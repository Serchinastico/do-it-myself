import { Button } from "@app/core/components/Button";
import { Cue } from "@app/core/components/Cue";
import { Illustration } from "@app/core/components/Illustration";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { Header } from "@app/features/settings/components/headers";
import { t } from "@lingui/macro";
import {
  Center,
  Column,
  SafeAreaViewEdges,
  useToast,
} from "@madeja-studio/telar";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Platform, Text } from "react-native";
import { Product } from "react-native-iap";
import useAsyncEffect from "use-async-effect";

import { useInAppPurchase } from "../hooks/useInAppPurchase";

export const PurchaseScreen = ({ navigation }: RootScreenProps<"purchase">) => {
  const { getAvailableProducts, hasPurchasedApp, requestPurchase } =
    useInAppPurchase();
  const [product, setProduct] = useState<Product | null>(null);
  const setHasPurchasedApp = useSetAtom(atoms.hasPurchasedApp);
  const { showToast } = useToast();

  useAsyncEffect(async () => {
    const products = await getAvailableProducts();
    setProduct(products[0]);
  }, []);

  const onPurchasePress = useCallback(async () => {
    const response = await requestPurchase("app_purchase");

    if (response) {
      setHasPurchasedApp(true);
      navigation.goBack();
      setTimeout(() => {
        navigation.navigate("appPurchased");
      }, 1);
    }
  }, [navigation]);

  const onRestorePurchasePress = useCallback(async () => {
    const hasRestoredPurchase = await hasPurchasedApp();

    setHasPurchasedApp(hasRestoredPurchase);
    showToast({
      subtitle: hasRestoredPurchase
        ? t`You can start using the full version of Do It Myself`
        : t`There was no Do It Myself purchase found in your account`,
      title: hasRestoredPurchase
        ? t`You restored your Do Iy Myself purchase!`
        : t`The purchase was not restored`,
      variant: hasRestoredPurchase ? "success" : "error",
    });
  }, []);

  return (
    <SafeArea edges={SafeAreaViewEdges.NoTop}>
      <Header.Purchase onClose={() => navigation.goBack()} />

      <Column style={tw`flex-1 px-8`}>
        <Column style={tw`flex-1 center`}>
          <Text style={tw`h2`}>{t`Why buy the app?`}</Text>
          <Cue
            style={tw`mt-4`}
            textStyle={tw`h3`}
          >{t`The app for you, forever.`}</Cue>
          <Cue
            style={tw`mt--2`}
            textStyle={tw`h3`}
          >{t`Unlimited projects.`}</Cue>
          <Cue
            style={tw`mt--2`}
            textStyle={tw`h3`}
          >{t`Styles for your manuals.`}</Cue>
          <Cue style={tw`mt--2`} textStyle={tw`h3`}>{t`Future updates.`}</Cue>
          <Center style={tw`my-4`}>
            <Illustration heightWindowRatio="1/5" name="purchase" />
          </Center>
          <Text style={tw`h2`}>{t`Why 6.99€?`}</Text>
          <Text
            style={tw`body mt-2 text-center`}
          >{t`Let's be honest: We went to a store to see how much a personalized project notebook costs, and this was the price. That's it.`}</Text>
        </Column>

        <Column style={tw`gap-2`}>
          <Button
            hasAutoLoad
            icon={{ family: "Feather", name: "shopping-bag" }}
            onPress={onPurchasePress}
            text={t`6.99€`}
            textStyle={tw`h3 text-white ml-3`}
          />
          {Platform.OS === "ios" && (
            <Button
              hasAutoLoad
              onPress={onRestorePurchasePress}
              text={t`Restore purchase`}
              variant="text"
            />
          )}
        </Column>
      </Column>
    </SafeArea>
  );
};
