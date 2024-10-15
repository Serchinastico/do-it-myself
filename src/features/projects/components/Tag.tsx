import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { color } from "@app/core/theme/color";
import { ProjectTag } from "@app/domain/project";
import { Button, OnPress } from "@madeja-studio/telar";
import { Text } from "react-native";

interface Props {
  isSelected: boolean;
  onPress?: OnPress;
  tag: ProjectTag;
}

export const Tag = ({ isSelected, onPress, tag }: Props) => {
  const colorSwitch = useColorSwitch();

  return (
    <Button.Container
      hasHapticFeedback
      onPress={onPress}
      style={tw.style(`px-4 py-2 border rounded-full`, {
        borderColor: isSelected
          ? color.primary
          : colorSwitch({ dark: color.white, light: color.secondary }),
      })}
    >
      <Text
        style={tw.style(`body font-bold`, {
          color: isSelected
            ? color.primary
            : colorSwitch({ dark: color.white, light: color.secondary }),
        })}
      >
        {tag.name}
      </Text>
    </Button.Container>
  );
};
