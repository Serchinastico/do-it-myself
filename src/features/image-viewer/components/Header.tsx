import { color } from "@app/core/theme/color";
import { t } from "@lingui/macro";
import { Button, OnPress, Row } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onClose: OnPress;
  page: { current: number; total: number };
}

export const Header = ({ onClose, page }: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Row
      style={tw.style(
        `mt-[${bottom}px] center absolute left-0 right-0 top-0 z-10`,
        {
          backgroundColor: chroma(color.secondary).alpha(0.7).hex(),
        }
      )}
    >
      <Text style={tw.style(`button text-center ml-12 text-white flex-1`)}>
        {t`${page.current} of ${page.total}`}
      </Text>
      <Button.Icon
        color="tertiary"
        icon={{ family: "Feather", name: "x" }}
        onPress={onClose}
        variant="text"
      />
    </Row>
  );
};
