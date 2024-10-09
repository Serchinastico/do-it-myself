import { LocalImage } from "@app/domain/project";
import { Button, Center, OnPress } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { Dimensions, Image, View } from "react-native";

interface Props {
  image: LocalImage;
  onPress: OnPress;
  tint: string;
}

export const AttachmentImage = ({ image, onPress, tint }: Props) => {
  const { width } = Dimensions.get("screen");
  const imageWidth = (width - 48) / 2;
  const imageHeight = imageWidth * (image.height / image.width);

  return (
    <Center style={tw`p-1 relative`}>
      <Button.Container hasHapticFeedback onPress={onPress} style={tw`z-10`}>
        <Image
          height={imageHeight}
          source={{
            uri: `${FileSystem.documentDirectory}${image.path}`,
          }}
          style={tw`rounded-card cover`}
          width={imageWidth}
        />
      </Button.Container>
      <View
        style={tw.style(`rounded-card absolute top-1 bottom-0.5 inset-x-1`, {
          backgroundColor: tint,
        })}
      />
    </Center>
  );
};
