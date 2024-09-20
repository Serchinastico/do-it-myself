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
  return (
    <Button.Container
      color="tertiary"
      hasHapticFeedback
      onPress={onPress}
      style={[tw`gap-1 flex-row center bg-white rounded-full px-4 py-2`, style]}
    >
      <VectorIcon icon={icon} size={24} />
      <Text style={tw`button`}>{text}</Text>
    </Button.Container>
  );
};
