import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { Button } from "@app/core/components/Button";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import {
  ColorScheme,
  getNameFromColorScheme,
} from "@app/core/theme/color-scheme";
import { SettingsHeader } from "@app/features/settings/components/SettingsHeader";
import Illustration from "@assets/img/illustration.svg";
import { Trans, t } from "@lingui/macro";
import {
  Center,
  Column,
  SafeAreaView,
  Button as TelarButton,
} from "@madeja-studio/telar";
import { useAtom } from "jotai";
import { useCallback, useRef } from "react";
import { ScrollView, StatusBar, Text } from "react-native";
import { useAppColorScheme } from "twrnc";

export const SettingsScreen = ({ navigation }: RootScreenProps<"settings">) => {
  const [, , setTwColorScheme] = useAppColorScheme(tw);
  const accordionRef = useRef<AccordionRef>(null);
  const [colorScheme, setColorScheme] = useAtom(atoms.colorScheme);

  const onColorSchemePress = useCallback(async (scheme: ColorScheme) => {
    setColorScheme(scheme);
    setTwColorScheme(scheme);
    accordionRef.current?.close();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <SettingsHeader onClose={() => navigation.goBack()} />

      <ScrollView>
        <Column style={tw`px-8`}>
          <Accordion
            childrenHeight={136}
            fieldName={t`Theme`}
            ref={accordionRef}
            selectedValue={getNameFromColorScheme(colorScheme ?? "light")}
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

          <Center>
            <Illustration />
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
        text={t`Purchase`}
      />
    </SafeAreaView>
  );
};
