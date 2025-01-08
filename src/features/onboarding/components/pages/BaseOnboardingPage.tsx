import { Cue } from "@app/core/components/Cue";
import {
  Illustration,
  IllustrationName,
} from "@app/core/components/Illustration";
import { Center, Column } from "@madeja-studio/telar";
import { Text } from "react-native";

interface Props {
  description: string;
  illustrationName: IllustrationName;
  title: string;
}

export const BaseOnboardingPage = ({
  description,
  illustrationName,
  title,
}: Props) => {
  return (
    <Column key="page-1" style={tw`px-8 py-4 flex-1 center`}>
      <Center style={tw`flex-2`}>
        <Cue textStyle={tw`h1 text-center text-white`}>{title}</Cue>
      </Center>

      <Center style={tw`my-8 flex-2`}>
        <Illustration heightWindowRatio={"1/3"} name={illustrationName} />
      </Center>

      <Center style={tw`flex-1`}>
        <Text style={tw`body text-center`}>{description}</Text>
      </Center>
    </Column>
  );
};
