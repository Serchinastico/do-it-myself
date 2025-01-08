import { Cue } from "@app/core/components/Cue";
import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/core/macro";
import { Center, Column } from "@madeja-studio/telar";
import { Text } from "react-native";

const OnboardingPage1 = () => {
  return (
    <Column key="page-1" style={tw`px-8 py-4 flex-1 center`}>
      <Cue
        textStyle={tw`h1 text-center text-white`}
      >{t`Keep your DIY projects well organized`}</Cue>

      <Center style={tw`my-8`}>
        <Illustration heightWindowRatio={"1/3"} name="app_purchased" />
      </Center>

      <Text
        style={tw`body text-center`}
      >{t`Name them, tag them, search through your collection, and never lose track of a project again.`}</Text>
    </Column>
  );
};

export default OnboardingPage1;
