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
        backgroundColor: colorSwitch({
          dark: isSelected ? color.primary : color.ash,
          light: undefined,
        }),
        borderColor: colorSwitch({
          dark: isSelected ? color.ash : color.primary,
          light: isSelected ? color.primary : color.ash,
        }),
      })}
    >
      <Text
        style={tw.style(`body font-bold`, {
          color: colorSwitch({
            dark: color.white,
            light: isSelected ? color.primary : color.ash,
          }),
        })}
      >
        {tag.getName()}
      </Text>
    </Button.Container>
  );
};
