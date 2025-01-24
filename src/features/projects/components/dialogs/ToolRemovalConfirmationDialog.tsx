import { Button } from "@app/core/components/Button";
import { Dialog } from "@app/core/components/Dialog";
import { Illustration } from "@app/core/components/Illustration";
import { useLingui } from "@lingui/react/macro";
import { Center, Column, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text } from "react-native";

interface Props extends ComponentProps<typeof Dialog> {
  onAccept: OnPress;
}

export const ToolRemovalConfirmationDialog = ({
  isVisible,
  onAccept,
  onClose,
}: Props) => {
  const { t } = useLingui();

  return (
    <Dialog isVisible={isVisible} onClose={onClose}>
      <Column>
        <Center style={tw`mt-8`}>
          <Illustration heightWindowRatio="1/3" name="confirmation" />
        </Center>

        <Text style={tw`h1 mt-4`}>{t`Remove tool`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`You are about to remove a tool from your project. If you had any data stored in the tool, you will not be able to recover it.`}</Text>
        <Row style={tw`center gap-4 mt-6`}>
          <Button
            color="secondary"
            onPress={onClose}
            text={t`Cancel`}
            variant="text"
          />
          <Button onPress={onAccept} text={t`Accept`} />
        </Row>
      </Column>
    </Dialog>
  );
};
