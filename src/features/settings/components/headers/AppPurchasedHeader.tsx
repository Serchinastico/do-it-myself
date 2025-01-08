import { Header } from "@app/core/components/Header";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { t } from "@lingui/core/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onClose: OnPress;
}

export const AppPurchasedHeader = ({ onClose }: Props) => {
  const colorSwitch = useColorSwitch();

  return (
    <Header style={tw`mt-4`} title={t`App purchased`}>
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "x" }}
        iconTint={colorSwitch({ dark: "white", light: "ash" })}
        onPress={onClose}
        variant="text"
      />
    </Header>
  );
};
