import { Header as GenericHeader } from "@app/core/components/Header";
import { Button, OnPress } from "@madeja-studio/telar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onClose: OnPress;
}

export const Header = ({ onClose }: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <GenericHeader style={tw`mt-[${bottom}px]`} title="">
      <Button.Icon
        color="tertiary"
        icon={{ family: "Feather", name: "x" }}
        onPress={onClose}
        variant="text"
      />
    </GenericHeader>
  );
};
