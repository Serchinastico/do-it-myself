import { Header } from "@app/core/components/Header";
import { color } from "@app/core/theme/color";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";
import { useAppColorScheme } from "twrnc";

interface Props {
  onSettingsPress: OnPress;
}

export const ProjectsHeader = ({ onSettingsPress }: Props) => {
  const [colorScheme] = useAppColorScheme(tw);

  return (
    <Header title={t`Projects`}>
      <Button.Icon
        color="secondary"
        hasHapticFeedback
        icon={{ family: "Feather", name: "user" }}
        iconTint={colorScheme === "dark" ? color.ash : color.white}
        onPress={onSettingsPress}
        variant="text"
      />
    </Header>
  );
};
