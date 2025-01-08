import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { atoms } from "@app/core/storage/state";
import { t } from "@lingui/core/macro";
import { Column, Button as TelarButton } from "@madeja-studio/telar";
import { useAtom } from "jotai";
import { useCallback, useRef } from "react";
import { Text } from "react-native";

export const HapticFeedbackOption = () => {
  const accordionRef = useRef<AccordionRef>(null);
  const [isEnabled, setIsEnabled] = useAtom(atoms.isHapticFeedbackEnabled);

  const onOptionPress = useCallback(async (value: boolean) => {
    setIsEnabled(value);
    accordionRef.current?.close();
  }, []);

  return (
    <Accordion
      childrenHeight={148}
      fieldName={t`Haptic Feedback`}
      ref={accordionRef}
      selectedValue={isEnabled ? t`Enabled` : t`Disabled`}
    >
      <Column style={tw`center py-2`}>
        <TelarButton.Container
          // This is always activated because it's cool that enabling HA uses HA
          hasHapticFeedback
          onPress={() => onOptionPress(true)}
        >
          <Text
            style={tw.style(`h2`, {
              "text-primary underline": isEnabled,
            })}
          >{t`Enabled`}</Text>
        </TelarButton.Container>

        <TelarButton.Container
          hasHapticFeedback={isEnabled}
          onPress={() => onOptionPress(false)}
        >
          <Text
            style={tw.style(`h2 pt-3`, {
              "text-primary underline": !isEnabled,
            })}
          >{t`Disabled`}</Text>
        </TelarButton.Container>
      </Column>
    </Accordion>
  );
};
