import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onSettingsPress: OnPress;
}

export const ProjectsHeader = ({ onSettingsPress }: Props) => {
  return (
    <Header title={t`Projects`}>
      <Button.Icon
        color="secondary"
        hasHapticFeedback
        icon={{ family: "Feather", name: "user" }}
        onPress={onSettingsPress}
        variant="text"
      />
    </Header>
  );
};
