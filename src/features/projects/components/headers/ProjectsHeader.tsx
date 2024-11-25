import { Header } from "@app/core/components/Header";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onSettingsPress: OnPress;
}

export const ProjectsHeader = ({ onSettingsPress }: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const colorSwitch = useColorSwitch();

  return (
    <Header title={t`Projects`}>
      <Button.Icon
        color="secondary"
        hasHapticFeedback={isHapticFeedbackEnabled}
        icon={{ family: "Feather", name: "user" }}
        iconTint={colorSwitch({ dark: "white", light: "ash" })}
        onPress={onSettingsPress}
        variant="text"
      />
    </Header>
  );
};
