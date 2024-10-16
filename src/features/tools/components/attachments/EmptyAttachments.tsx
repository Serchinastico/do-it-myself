import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/macro";
import { Column } from "@madeja-studio/telar";
import { Text } from "react-native";

export const EmptyAttachments = () => {
  return (
    <Column style={tw`center flex-1 px-12 mb-28`}>
      <Illustration heightWindowRatio="1/3" name="no_media" />

      <Text style={tw`h1 text-center mt-8`}>{t`No attachments yet`}</Text>
      <Text
        style={tw`body text-center mt-4`}
      >{t`Add pictures and videos to your project to serve as references, inspiration or anything you want.`}</Text>
      <Text
        style={tw`button bg-primary text-white mt-4`}
      >{t`Add some media to the project now.`}</Text>
    </Column>
  );
};
