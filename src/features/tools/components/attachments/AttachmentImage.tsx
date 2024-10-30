import { LocalImage } from "@app/domain/project";
import { t } from "@lingui/macro";
import { Button, Center, OnPress } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { Dimensions, Image, View } from "react-native";
import * as ContextMenu from "zeego/context-menu";

interface Props {
  colSpan: number;
  image: LocalImage;
  onDelete: OnPress;
  onPress: OnPress;
  tint: string;
}

export const AttachmentImage = ({
  colSpan,
  image,
  onDelete,
  onPress,
  tint,
}: Props) => {
  const { width } = Dimensions.get("screen");
  const imageWidth = (width - 48) / colSpan;
  const imageHeight = imageWidth * (image.height / image.width);

  return (
    // @ts-expect-error ContextMenu.Root prop type does not accept style, but it actually uses it
    <ContextMenu.Root style={tw`rounded-card my-1`}>
      <ContextMenu.Trigger>
        <Center style={tw`pb-1.5 relative`}>
          <Button.Container
            hasHapticFeedback
            onPress={onPress}
            style={tw`z-10`}
          >
            <Image
              height={imageHeight}
              source={{ uri: `${FileSystem.documentDirectory}${image.path}` }}
              style={tw`rounded-card cover`}
              width={imageWidth}
            />
          </Button.Container>
          <View
            style={tw.style(
              `rounded-card absolute top-1 bottom-0.5 inset-x-1`,
              { backgroundColor: tint }
            )}
          />
        </Center>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item destructive key="delete" onSelect={onDelete}>
          <ContextMenu.ItemTitle>{t`Delete item`}</ContextMenu.ItemTitle>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
