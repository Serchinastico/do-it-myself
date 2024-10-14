import { Button } from "@app/core/components/Button";
import Illustration from "@assets/img/illustration.svg";
import { t } from "@lingui/macro";
import { Column, Dialog, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text, View } from "react-native";

interface Props extends ComponentProps<typeof Dialog> {
  onPurchaseAppPress: OnPress;
}

export const ProjectsLimitReachedDialog = ({
  isVisible,
  onClose,
  onPurchaseAppPress,
}: Props) => {
  return (
    <Dialog isVisible={isVisible} onClose={onClose}>
      <Column>
        <View style={tw`center mt-8`}>
          <Illustration />
        </View>

        <Text style={tw`h1 mt-4`}>{t`You have run out of projects!`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`The free version of Do It Myself only allows 3 projects. Buy the app to have access to unlimited projects and more.`}</Text>
        <Text
          style={tw`body mt-4 font-bold`}
        >{t`No subscriptions, buy the app and it'll be yours, forever.`}</Text>
        <Row style={tw`center gap-4 mt-6`}>
          <Button
            color="secondary"
            onPress={onClose}
            text={t`Cancel`}
            variant="text"
          />
          <Button
            icon={{ family: "Feather", name: "shopping-bag" }}
            onPress={onPurchaseAppPress}
            text={t`Purchase`}
          />
        </Row>
      </Column>
    </Dialog>
  );
};
