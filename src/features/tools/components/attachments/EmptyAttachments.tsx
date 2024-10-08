import { Button } from "@app/core/components/Button";
import Illustration from "@assets/img/illustration.svg";
import { t } from "@lingui/macro";
import { Center, Column } from "@madeja-studio/telar";
import { Text } from "react-native";

export const EmptyAttachments = () => {
  return (
    <Column style={tw`flex-1 justify-between px-4`}>
      <Column style={tw`flex-1 center`}>
        <Center>
          <Illustration />
        </Center>

        <Text style={tw`h1 text-center mt-8`}>{t`No attachments yet`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`Add pictures and videos to your project to serve as references, inspiration or anything you want.`}</Text>
        <Text
          style={tw`button bg-primary text-white mt-4`}
        >{t`Add some media to the project now`}</Text>
      </Column>

      <Button
        icon={{ family: "Feather", name: "plus" }}
        text={t`Add attachment`}
      />
    </Column>
  );
};
