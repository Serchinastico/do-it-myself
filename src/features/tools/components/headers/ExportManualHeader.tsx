import { Header } from "@app/core/components/Header";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useLingui } from "@lingui/react/macro";
import { Button, OnPress } from "@madeja-studio/telar";

interface Props {
  onClose: OnPress;
}

export const ExportManualHeader = ({ onClose }: Props) => {
  const { t } = useLingui();
  const colorSwitch = useColorSwitch();

  return (
    <Header style={tw`mt-4`} title={t`Export`}>
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
