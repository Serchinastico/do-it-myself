import { Button } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { ScrollView } from "@app/core/components/ScrollView";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { HapticFeedbackOption } from "@app/features/settings/components/options/HapticFeedbackOption";
import { ThemeOption } from "@app/features/settings/components/options/ThemeOption";
import { t } from "@lingui/macro";
import { Column } from "@madeja-studio/telar";
import { useAtomValue } from "jotai";

import { AppPurchasePrompt } from "../components/AppPurchasePrompt";
import { Header } from "../components/headers";

export const SettingsScreen = ({ navigation }: RootScreenProps<"settings">) => {
  const hasPurchasedApp = useAtomValue(atoms.hasPurchasedApp);

  return (
    <SafeArea>
      <Header.Settings onClose={() => navigation.goBack()} />

      <ScrollView>
        <Column style={tw`px-8`}>
          <ThemeOption />

          <HapticFeedbackOption />

          {!hasPurchasedApp && <AppPurchasePrompt />}
        </Column>
      </ScrollView>

      {!hasPurchasedApp && (
        <Button
          icon={{ family: "Feather", name: "shopping-bag" }}
          onPress={() => navigation.navigate("purchase")}
          text={t`Purchase`}
        />
      )}
    </SafeArea>
  );
};
