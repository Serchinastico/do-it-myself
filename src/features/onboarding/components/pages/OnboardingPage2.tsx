import { Cue } from "@app/core/components/Cue";
import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/macro";
import { Center, Column } from "@madeja-studio/telar";
import { Text } from "react-native";

const OnboardingPage2 = () => {
  return (
    <Column key="page-1" style={tw`px-8 py-4 flex-1 center`}>
      <Cue
        textStyle={tw`h1 text-center text-white`}
      >{t`Tools to track your progress`}</Cue>

      <Center style={tw`my-8`}>
        <Illustration heightWindowRatio={"1/3"} name="confirmation" />
      </Center>

      <Text
        style={tw`body text-center`}
      >{t`Worklogs, manuals and attachments at your fingertips, you'll have everything you need to keep track of your progress.`}</Text>
    </Column>
  );
};

export default OnboardingPage2;
