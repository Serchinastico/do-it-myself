import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { LocalVideo } from "@app/domain/project";
import { t } from "@lingui/core/macro";
import { Button, Center, OnPress } from "@madeja-studio/telar";
import { ResizeMode, Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import { Dimensions, View } from "react-native";
import * as ContextMenu from "zeego/context-menu";

interface Props {
  colSpan: number;
  onDelete: OnPress;
  onPress: OnPress;
  tint: string;
  video: LocalVideo;
}

export const AttachmentVideo = ({
  colSpan,
  onDelete,
  onPress,
  tint,
  video,
}: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const { width } = Dimensions.get("screen");
  const imageWidth = (width - 48) / colSpan;
  const imageHeight = imageWidth * (video.height / video.width);

  console.log(colSpan, imageWidth, imageHeight);

  return (
    // @ts-expect-error ContextMenu.Root prop type does not accept style, but it actually uses it
    <ContextMenu.Root style={tw`rounded-card my-1`}>
      <ContextMenu.Trigger>
        <Center style={tw`pb-1.5 relative`}>
          <Button.Container
            hasHapticFeedback={isHapticFeedbackEnabled}
            onPress={onPress}
            style={tw`z-10`}
          >
            <Video
              isLooping
              isMuted
              resizeMode={ResizeMode.COVER}
              shouldPlay
              source={{ uri: `${FileSystem.documentDirectory}${video.path}` }}
              style={[
                tw`rounded-card cover`,
                { height: imageHeight, width: imageWidth },
              ]}
              usePoster
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
