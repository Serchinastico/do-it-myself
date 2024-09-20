import { Button } from "@app/core/components/Button";
import Illustration from "@assets/img/illustration.svg";
import { t } from "@lingui/macro";
import { Column, Dialog, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text, View } from "react-native";

interface Props extends ComponentProps<typeof Dialog> {
  onAccept: OnPress;
}

export const ToolRemovalConfirmationDialog = ({
  isVisible,
  onAccept,
  onClose,
}: Props) => {
  return (
    <Dialog isVisible={isVisible} onClose={onClose}>
      <Column>
        <View style={tw`center mt-8`}>
          <Illustration />
        </View>

        <Text style={tw`h1 mt-4`}>{t`Remove tool`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`You are about to remove a tool from your project. If you had any data stored in the tool, you will not be able to recover it.`}</Text>
        <Row style={tw`center gap-4 mt-6`}>
          <Button onPress={onAccept} text={t`Accept`} />
          <Button onPress={onClose} text={t`Cancel`} variant="text" />
        </Row>
      </Column>
    </Dialog>
  );
};
