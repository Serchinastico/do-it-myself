import { Header } from "@app/core/components/Header";
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
  return (
    <Header
      hasBackButton
      onBackPress={onBackPress}
      style={tw`mt-4`}
      subtitle={isEditing ? t`Editing` : undefined}
      title={t`Manual`}
    >
      <Button.Icon
        color={isEditing ? "primary" : "secondary"}
        hasHapticFeedback
        icon={{ family: "Feather", name: "edit-3" }}
        onPress={onEditPress}
        variant={isEditing ? "contained" : "text"}
      />

      <Button.Icon
        color="secondary"
        hasHapticFeedback
        icon={{ family: "Feather", name: "share" }}
        onPress={onExportPress}
        variant="text"
      />
    </Header>
  );
};
