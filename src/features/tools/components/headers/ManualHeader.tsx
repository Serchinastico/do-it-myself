import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onBackPress: OnPress;
  onEditPress: OnPress;
  onExportPress: OnPress;
}

export const ManualHeader = ({
  onBackPress,
  onEditPress,
  onExportPress,
}: Props) => {
  return (
    <Header
      hasBackButton
      onBackPress={onBackPress}
      style={tw`mt-4`}
      title={t`Manual`}
    >
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "edit-3" }}
        onPress={onEditPress}
        variant="text"
      />

      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "share" }}
        onPress={onEditPress}
        variant="text"
      />
    </Header>
  );
};
