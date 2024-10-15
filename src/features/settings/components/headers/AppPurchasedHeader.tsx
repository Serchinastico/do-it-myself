import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onClose: OnPress;
}

export const AppPurchasedHeader = ({ onClose }: Props) => {
  return (
    <Header style={tw`mt-4`} title={t`App purchased`}>
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "x" }}
        onPress={onClose}
        variant="text"
      />
    </Header>
  );
};
