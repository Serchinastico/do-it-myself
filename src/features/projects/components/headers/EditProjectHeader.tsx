import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onClose: OnPress;
}

export const EditProjectHeader = ({ onClose }: Props) => {
  return (
    <Header style={tw`mt-4`} title={t`Edit project`}>
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "x" }}
        onPress={onClose}
        variant="text"
      />
    </Header>
  );
};
