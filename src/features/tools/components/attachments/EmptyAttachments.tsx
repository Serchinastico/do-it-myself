import { Cue } from "@app/core/components/Cue";
import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/core/macro";
import { Column } from "@madeja-studio/telar";
import { Text } from "react-native";

export const EmptyAttachments = () => {
  return (
    <Column style={tw`center flex-1 px-8 mb-28`}>
      <Illustration heightWindowRatio="2/7" name="no_media" />

      <Text style={tw`h1 text-center mt-8`}>{t`No attachments yet`}</Text>
      <Text
        style={tw`body text-center mt-4`}
      >{t`Add pictures and videos to your project to serve as references, inspiration or anything you want.`}</Text>
      <Cue style={tw`mt-4`}>{t`Add some media to the project now.`}</Cue>

      <Illustration heightWindowRatio="1/7" name="arrow" />
    </Column>
  );
};
