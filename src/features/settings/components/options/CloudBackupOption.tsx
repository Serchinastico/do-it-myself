import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { useCloudBackup } from "@app/core/providers/CloudBackupContextProvider";
import { CloudBackupProvider } from "@app/domain/cloudBackup";
import { useLingui } from "@lingui/react/macro";
import { Button, Column } from "@madeja-studio/telar";
import { useCallback, useRef, useState } from "react";
import { Platform, Text } from "react-native";

export const CloudBackupOption = () => {
  const accordionRef = useRef<AccordionRef>(null);
  const { provider, setProvider } = useCloudBackup();
  const [isLoading, setIsLoading] = useState(false);
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const { t } = useLingui();

  const onOptionPress = useCallback(
    async (value: CloudBackupProvider) => {
      accordionRef.current?.close();

      setIsLoading(true);
      await setProvider(value);
      setIsLoading(false);
    },
    [setProvider]
  );

  return (
    <Accordion
      childrenHeight={148}
      fieldName={t`Cloud Backup`}
      isLoading={isLoading}
      ref={accordionRef}
      selectedValue={
        provider === "gcloud"
          ? t`Google Cloud`
          : provider === "icloud"
            ? t`iCloud`
            : t`Disabled`
      }
    >
      <Column style={tw`center py-2 gap-y-4`}>
        <Button.Container
          hasHapticFeedback={isHapticFeedbackEnabled}
          onPress={() => onOptionPress(false)}
        >
          <Text
            style={tw.style(`h2`, {
              "text-primary underline": provider === false,
            })}
          >{t`Disabled`}</Text>
        </Button.Container>

        <Button.Container
          hasHapticFeedback={isHapticFeedbackEnabled}
          onPress={() => onOptionPress("gcloud")}
        >
          <Text
            style={tw.style(`h2`, {
              "text-primary underline": provider === "gcloud",
            })}
          >{t`Google Cloud`}</Text>
        </Button.Container>

        {Platform.OS === "ios" && (
          <Button.Container
            hasHapticFeedback={isHapticFeedbackEnabled}
            onPress={() => onOptionPress("icloud")}
          >
            <Text
              style={tw.style(`h2`, {
                "text-primary underline": provider === "icloud",
              })}
            >{t`iCloud`}</Text>
          </Button.Container>
        )}
      </Column>
    </Accordion>
  );
};
