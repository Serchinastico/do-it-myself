import { Cue } from "@app/core/components/Cue";
import { Illustration } from "@app/core/components/Illustration";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { t } from "@lingui/core/macro";
import { Button, Column, OnPress } from "@madeja-studio/telar";
import { Text } from "react-native";

interface Props {
  onCreatePress: OnPress;
}

export const EmptyProjects = ({ onCreatePress }: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();

  return (
    <Column style={tw`flex-1 center mb-28 mt-14 px-12`}>
      <Illustration heightWindowRatio="1/3" name="not_found" />

      <Text style={tw`h2 mt-6 text-center`}>{t`No projects yet`}</Text>
      <Text
        style={tw`body text-center mt-4`}
      >{t`It’s time to create a project and start doing things.`}</Text>

      <Button.Container
        hasHapticFeedback={isHapticFeedbackEnabled}
        onPress={onCreatePress}
      >
        <Cue
          style={tw`mt-4`}
          textStyle={tw`text-center`}
        >{t`Create a new project to get going.`}</Cue>
      </Button.Container>

      <Illustration heightWindowRatio="1/7" name="arrow" />
    </Column>
  );
};
