import { color } from "@app/core/theme/color";
import {
  Button,
  IconReference,
  OnPress,
  VectorIcon,
} from "@madeja-studio/telar";
import { Text, ViewStyle } from "react-native";
import { useAppColorScheme } from "twrnc";

interface Props {
  icon: IconReference;
  onPress?: OnPress;
  style?: ViewStyle;
  text: string;
}

export const ToolButton = ({ icon, onPress, style, text }: Props) => {
  const [colorScheme] = useAppColorScheme(tw);

  return (
    <Button.Container
      color="tertiary"
      hasHapticFeedback
      onPress={onPress}
      style={[
        tw`gap-2 flex-row center bg-white dark:bg-ash rounded-full px-4 py-2`,
        style,
      ]}
    >
      <VectorIcon
        color={colorScheme === "dark" ? color.white : color.ash}
        icon={icon}
        size={24}
      />
      <Text style={tw`button`}>{text}</Text>
    </Button.Container>
  );
};
