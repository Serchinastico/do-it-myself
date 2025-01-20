import { color } from "@app/core/theme/color";
import { Button, OnPress, Row } from "@madeja-studio/telar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onClose: OnPress;
}

export const VideoViewerHeader = ({ onClose }: Props) => {
  const { top } = useSafeAreaInsets();
  return (
    <Row style={tw.style(`flex-row-reverse pr-2`, { marginTop: top })}>
      <Button.Icon
        color="tertiary"
        icon={{ family: "Feather", name: "x" }}
        iconTint={color.white}
        onPress={onClose}
        variant="text"
      />
    </Row>
  );
};
