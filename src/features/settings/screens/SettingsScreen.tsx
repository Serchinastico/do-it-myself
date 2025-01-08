import { Button } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { ScrollView } from "@app/core/components/ScrollView";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { t } from "@lingui/core/macro";
import { Column, SafeAreaViewEdges } from "@madeja-studio/telar";
import { useAtomValue } from "jotai";
import { useEffect, useReducer, useState } from "react";
import { Appearance } from "react-native";

import { AppPurchasePrompt } from "../components/AppPurchasePrompt";
import { Header } from "../components/headers";
import { Option } from "../components/options";

export const SettingsScreen = ({ navigation }: RootScreenProps<"settings">) => {
  const hasPurchasedApp = useAtomValue(atoms.hasPurchasedApp);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    /**
     * For some reason, I still need to subscribe to appearance changes
     * to force a re-render on the settings page.
     */
    Appearance.addChangeListener(() => {
      forceUpdate();
    });
  }, []);

  return (
    <SafeArea edges={SafeAreaViewEdges.NoBottom}>
      <Header.Settings
        onClose={() => navigation.goBack()}
        scrollOffset={scrollOffset}
      />

      <ScrollView
        contentContainerStyle={tw`pb-8`}
        onScroll={({ nativeEvent }) =>
          setScrollOffset(nativeEvent.contentOffset.y)
        }
      >
        <Column style={tw`px-8`}>
          <Option.Theme />
          <Option.HapticFeedback />
          <Option.CloudBackup />

          {!hasPurchasedApp && (
            <>
              <AppPurchasePrompt />
              <Button
                icon={{ family: "Feather", name: "shopping-bag" }}
                onPress={() => navigation.navigate("purchase")}
                style={tw`mt-8`}
                text={t`Purchase`}
              />
            </>
          )}
        </Column>
      </ScrollView>
    </SafeArea>
  );
};
