import { LocalImage } from "@app/domain/project";
import { Button, OnPress } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { Dimensions, Image } from "react-native";

interface Props {
  image: LocalImage;
  onPress: OnPress;
}

export const AttachmentImage = ({ image, onPress }: Props) => {
  const { width } = Dimensions.get("screen");
  const imageWidth = (width - 48) / 2;
  const imageHeight = imageWidth * (image.height / image.width);

  return (
    <Button.Container hasHapticFeedback onPress={onPress} style={tw`p-1`}>
      <Image
        height={imageHeight}
        source={{
          uri: `${FileSystem.documentDirectory}${image.path}`,
        }}
        style={tw`rounded-card cover`}
        width={imageWidth}
      />
    </Button.Container>
  );
};
