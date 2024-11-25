import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { atoms } from "@app/core/storage/state";
import {
  ColorScheme,
  getNameFromColorScheme,
} from "@app/core/theme/color-scheme";
import { t } from "@lingui/macro";
import { Column, Button as TelarButton } from "@madeja-studio/telar";
import { useAtom } from "jotai/index";
import { useCallback, useRef } from "react";
import { Appearance, Text } from "react-native";
import { useAppColorScheme } from "twrnc";

export const ThemeOption = () => {
  const [twColorScheme, , setTwColorScheme] = useAppColorScheme(tw);
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const [colorScheme, setColorScheme] = useAtom(atoms.colorScheme);
  const accordionRef = useRef<AccordionRef>(null);

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
    <Accordion
      childrenHeight={148}
      fieldName={t`Theme`}
      ref={accordionRef}
      selectedValue={getNameFromColorScheme(resolvedColorScheme ?? "light")}
    >
      <Column style={tw`center py-2`}>
        <TelarButton.Container
          hasHapticFeedback={isHapticFeedbackEnabled}
          onPress={() => onColorSchemePress("light")}
        >
          <Text
            style={tw.style(`h2`, {
              "text-primary underline": colorScheme === "light",
            })}
          >{t`Light`}</Text>
        </TelarButton.Container>

        <TelarButton.Container
          hasHapticFeedback={isHapticFeedbackEnabled}
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
  );
};
