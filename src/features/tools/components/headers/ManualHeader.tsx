import { Header } from "@app/core/components/Header";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { color } from "@app/core/theme/color";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  isEditing: boolean;
  onBackPress: OnPress;
  onEditPress: OnPress;
  onExportPress: OnPress;
}

export const ManualHeader = ({
  isEditing,
  onBackPress,
  onEditPress,
  onExportPress,
}: Props) => {
  const colorSwitch = useColorSwitch();

  return (
    <Header
      hasBackButton
      onBackPress={onBackPress}
      style={tw`mt-4`}
      subtitle={isEditing ? t`Editing` : undefined}
      title={t`Manual`}
    >
      <Button.Icon
        hasHapticFeedback
        icon={{ family: "Feather", name: "edit-3" }}
        iconTint={
          isEditing
            ? color.white
            : colorSwitch({ dark: "white", light: "secondary" })
        }
        onPress={onEditPress}
        variant={isEditing ? "contained" : "text"}
      />

      <Button.Icon
        hasHapticFeedback
        icon={{ family: "Feather", name: "share" }}
        iconTint={colorSwitch({ dark: "white", light: "secondary" })}
        onPress={onExportPress}
        variant="text"
      />
    </Header>
  );
};
