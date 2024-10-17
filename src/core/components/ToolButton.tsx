import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import {
  Button,
  IconReference,
  OnPress,
  VectorIcon,
} from "@madeja-studio/telar";
import { Text, ViewStyle } from "react-native";

interface Props {
  icon: IconReference;
  onPress?: OnPress;
  style?: ViewStyle;
  text: string;
}

export const ToolButton = ({ icon, onPress, style, text }: Props) => {
  const colorSwitch = useColorSwitch();

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
        color={colorSwitch({ dark: "white", light: "ash" })}
        icon={icon}
        size={24}
      />
      <Text
        style={[
          tw`button`,
          { color: colorSwitch({ dark: "white", light: "ash" }) },
        ]}
      >
        {text}
      </Text>
    </Button.Container>
  );
};
