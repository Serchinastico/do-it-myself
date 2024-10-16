import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { Button } from "@app/core/components/Button";
import { Illustration } from "@app/core/components/Illustration";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import {
  ColorScheme,
  getNameFromColorScheme,
} from "@app/core/theme/color-scheme";
import { Trans, t } from "@lingui/macro";
import { Center, Column, Button as TelarButton } from "@madeja-studio/telar";
import { useAtom } from "jotai";
import { useCallback, useRef } from "react";
import { Appearance, ScrollView, Text } from "react-native";
import { useAppColorScheme } from "twrnc";

import { Header } from "../components/headers";

export const SettingsScreen = ({ navigation }: RootScreenProps<"settings">) => {
  const [twColorScheme, , setTwColorScheme] = useAppColorScheme(tw);
  const accordionRef = useRef<AccordionRef>(null);
  const [colorScheme, setColorScheme] = useAtom(atoms.colorScheme);

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
    [setTwColorScheme]
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
            <Column style={tw`center`}>
              <TelarButton.Container
                hasHapticFeedback
                onPress={() => onColorSchemePress("light")}
              >
                <Text style={tw`h2`}>{t`Light`}</Text>
              </TelarButton.Container>

              <TelarButton.Container
                hasHapticFeedback
                onPress={() => onColorSchemePress("dark")}
              >
                <Text style={tw`h2 mt-3`}>{t`Dark`}</Text>
              </TelarButton.Container>
            </Column>
          </Accordion>

          <Center style={tw`mt-8`}>
            <Illustration heightWindowRatio="1/3" name="settings" />
          </Center>

          <Text
            style={tw`h2 text-center mt-6`}
          >{t`Buy the app to get unlimited projects`}</Text>

          <Center style={tw`mt-4`}>
            <Trans>
              <Text style={tw`body text-center`}>
                <Text>
                  Support us in this project and get the app with no limitations{" "}
                </Text>
                <Text style={tw`font-bold`}>forever</Text>
                <Text>.</Text>
              </Text>
            </Trans>
          </Center>
        </Column>
      </ScrollView>

      <Button
        icon={{ family: "Feather", name: "shopping-bag" }}
        onPress={() => navigation.navigate("purchase")}
        text={t`Purchase`}
      />
    </SafeArea>
  );
};
