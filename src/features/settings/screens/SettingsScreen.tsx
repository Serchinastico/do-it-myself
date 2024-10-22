import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { Button } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import {
  ColorScheme,
  getNameFromColorScheme,
} from "@app/core/theme/color-scheme";
import { t } from "@lingui/macro";
import { Column, Button as TelarButton } from "@madeja-studio/telar";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useRef } from "react";
import { Appearance, ScrollView, Text } from "react-native";
import { useAppColorScheme } from "twrnc";

import { AppPurchasePrompt } from "../components/AppPurchasePrompt";
import { Header } from "../components/headers";

export const SettingsScreen = ({ navigation }: RootScreenProps<"settings">) => {
  const [twColorScheme, , setTwColorScheme] = useAppColorScheme(tw);
  const accordionRef = useRef<AccordionRef>(null);
  const [colorScheme, setColorScheme] = useAtom(atoms.colorScheme);
  const hasPurchasedApp = useAtomValue(atoms.hasPurchasedApp);

  const resolvedColorScheme = colorScheme ?? twColorScheme;

  const onColorSchemePress = useCallback(
    async (scheme: ColorScheme) => {
      /**
       * Appearance.setColorScheme is what really forces a re-render of all
       * components in the app. This works because we are using tw.memoBuster
       * in the main navigator.
       *
       * {@link https://github.com/jaredh159/tailwind-react-native-classnames/issues/112}
       */
      Appearance.setColorScheme(scheme);
      setColorScheme(scheme);
      setTwColorScheme(scheme);
      accordionRef.current?.close();
    },
    [setColorScheme, setTwColorScheme]
  );

  return (
    <SafeArea>
      <Header.Settings onClose={() => navigation.goBack()} />

      <ScrollView>
        <Column style={tw`px-8`}>
          <Accordion
            childrenHeight={148}
            fieldName={t`Theme`}
            ref={accordionRef}
            selectedValue={getNameFromColorScheme(
              resolvedColorScheme ?? "light"
            )}
          >
            <Column style={tw`center py-2`}>
              <TelarButton.Container
                hasHapticFeedback
                onPress={() => onColorSchemePress("light")}
              >
                <Text
                  style={tw.style(`h2`, {
                    "text-primary underline": colorScheme === "light",
                  })}
                >{t`Light`}</Text>
              </TelarButton.Container>

              <TelarButton.Container
                hasHapticFeedback
                onPress={() => onColorSchemePress("dark")}
              >
                <Text
                  style={tw.style(`h2 pt-3`, {
                    "text-primary underline": colorScheme === "dark",
                  })}
                >{t`Dark`}</Text>
              </TelarButton.Container>
            </Column>
          </Accordion>

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
