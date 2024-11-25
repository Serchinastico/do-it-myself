import { Cue } from "@app/core/components/Cue";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { color as themeColor } from "@app/core/theme/color";
import {
  PROJECT_COLORS,
  ProjectColor,
  ProjectColorId,
} from "@app/domain/project";
import { t } from "@lingui/macro";
import { Button, Column, Row } from "@madeja-studio/telar";
import { Text, View } from "react-native";

interface ColorItemProps extends Props {
  color: ProjectColor;
}

const ColorItem = ({
  color,
  onColorChange,
  selectedColorId,
}: ColorItemProps) => {
  const colorSwitch = useColorSwitch();
  const isSelected = color.id === selectedColorId;

  return (
    <Button.Container
      hasHapticFeedback
      onPress={() => onColorChange(color.id)}
      style={tw`w-1/4`}
    >
      <Column style={tw`center my-2`}>
        <View
          style={[
            tw`size-press rounded-full`,
            {
              backgroundColor: color.hex,
            },
          ]}
        />
        <Cue
          isMini
          style={tw.style(`mt-1 px-2 py-1`, {
            backgroundColor: isSelected ? color.hex : undefined,
          })}
          textStyle={tw.style({
            color: isSelected
              ? themeColor.ash
              : colorSwitch({ dark: "white", light: "ash" }),
            "font-extrabold": isSelected,
            fontSize: 18,
          })}
        >
          {color.getName}
        </Cue>
      </Column>
    </Button.Container>
  );
};

interface Props {
  onColorChange: (colorId: ProjectColorId) => void;
  selectedColorId: ProjectColorId;
}

export const ColorPicker = ({ onColorChange, selectedColorId }: Props) => {
  return (
    <Column>
      <Text style={tw`h3 mt-4`}>{t`Color`}</Text>
      <Row style={tw`flex-wrap`}>
        {PROJECT_COLORS.map((color) => (
          <ColorItem
            color={color}
            key={color.id}
            onColorChange={onColorChange}
            selectedColorId={selectedColorId}
          />
        ))}
      </Row>
    </Column>
  );
};
