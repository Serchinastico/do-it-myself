import { Button } from "@app/core/components/Button";
import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/macro";
import { Center, Column, Dialog, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text } from "react-native";

interface Props extends ComponentProps<typeof Dialog> {
  onAccept: OnPress;
}

export const ProjectDeletionConfirmationDialog = ({
  isVisible,
  onAccept,
  onClose,
}: Props) => {
  return (
    <Dialog isVisible={isVisible} onClose={onClose}>
      <Column>
        <Center style={tw`mt-8`}>
          <Illustration heightWindowRatio="1/4" name="confirmation" />
        </Center>

        <Text style={tw`h1 mt-6`}>{t`Delete project`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`You are about to delete this project. All the data stored in the project will be permanently deleted and you will not be able to recover it.`}</Text>
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
