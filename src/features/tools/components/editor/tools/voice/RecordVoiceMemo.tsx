import type { SpringConfig } from "react-native-reanimated/src/reanimated2/animation/springUtils";

import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import useRecording from "@app/core/hooks/useRecording";
import { color } from "@app/core/theme/color";
import { moveToDocuments } from "@app/core/utils/mediaFile";
import { ToolCallbackArgs } from "@app/features/tools/components/editor/tools/base";
import { t } from "@lingui/core/macro";
import { Button, Center, useToast } from "@madeja-studio/telar";
import { ContainerProps } from "@madeja-studio/telar/lib/typescript/src/component/Button/Container";
import * as Haptics from "expo-haptics";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { RecordingEffect, RecordingEffectRef } from "./RecordingEffect";

const VOICE_RECORDINGS_DIRECTORY = "VoiceRec";

const AnimatedButtonContainer = Animated.createAnimatedComponent(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forwardRef<{}, ContainerProps>(({ children, ...props }, _ref) => (
    <Button.Container {...props}>{children}</Button.Container>
  ))
);

const ANIMATION_CONFIG: SpringConfig = {
  dampingRatio: 0.5,
  duration: 250,
  stiffness: 50,
};

interface Props extends ToolCallbackArgs {}

export const RecordVoiceMemo = ({ editor }: Props) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const effectRef = useRef<RecordingEffectRef>(null);
  const {
    hasGrantedPermission,
    recording,
    recordingState,
    requestPermission,
    startRecording,
    stopRecording,
    volume,
  } = useRecording();
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const { showToast } = useToast();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const onPressIn = useCallback(async () => {
    const hasPermission = await hasGrantedPermission();

    if (hasPermission) {
      await Haptics.impactAsync();
      scale.value = withSpring(1.1, ANIMATION_CONFIG);
      rotation.value = withSpring(5, {
        ...ANIMATION_CONFIG,
        duration: 200,
      });
      effectRef.current?.start();

      await startRecording();
    } else {
      const result = await requestPermission();

      if (!result) {
        showToast({
          subtitle: t`Permissions for recording were not granted. Change the option from your device settings to record voice memos`,
          title: t`Unable to record audio`,
          variant: "error",
        });
      }
    }
  }, [startRecording, hasGrantedPermission, requestPermission, volume]);

  const onPressOut = useCallback(async () => {
    scale.value = withSpring(1, ANIMATION_CONFIG);
    rotation.value = withSpring(0, {
      ...ANIMATION_CONFIG,
      duration: 400,
    });
    effectRef.current?.stop();

    const recording = await stopRecording();
    if (!recording) return;

    const uri = recording.getURI();
    if (!uri) return;

    const path = await moveToDocuments({
      documentsDirectoryName: VOICE_RECORDINGS_DIRECTORY,
      extension: "m4a",
      uri,
    });

    editor.setAudioRecording({
      durationInMs: recording._finalDurationMillis,
      fileName: path,
    });
  }, [editor, stopRecording]);

  useEffect(() => {
    if (!recording) return;
    if (volume === 0) return;

    scale.value = withSpring(0.1 * volume + 1, ANIMATION_CONFIG);
  }, [recording, volume]);

  return (
    <AnimatedButtonContainer
      hasHapticFeedback={isHapticFeedbackEnabled}
      onPress={() => {}}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[animatedStyle]}
    >
      <Center
        style={tw.style(`h-[44px] w-[44px] rounded-4`, {
          "bg-primary": recordingState === "recording",
        })}
      >
        <Image
          resizeMode="contain"
          source={require("@assets/icons/mic.png")}
          style={tw.style(`h-[20px] w-[20px] z-10`)}
          tintColor={recordingState === "recording" ? color.white : color.ash}
        />

        <RecordingEffect ref={effectRef} />
      </Center>
    </AnimatedButtonContainer>
  );
};
