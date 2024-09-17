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
        <Text
          style={tw.style(`body mt-1 px-1`, {
            backgroundColor:
              color.id === selectedColorId ? color.hex : undefined,
            "font-bold": color.id === selectedColorId,
          })}
        >
          {color.name}
        </Text>
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
