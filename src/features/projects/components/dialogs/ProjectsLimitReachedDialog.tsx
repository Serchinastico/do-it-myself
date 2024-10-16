import { Button } from "@app/core/components/Button";
import { Dialog } from "@app/core/components/Dialog";
import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/macro";
import { Center, Column, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text } from "react-native";

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
        <Center style={tw`mt-8`}>
          <Illustration heightWindowRatio="1/4" name="paywall" />
        </Center>

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
