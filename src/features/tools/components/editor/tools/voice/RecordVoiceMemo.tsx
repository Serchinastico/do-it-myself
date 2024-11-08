import type { SpringConfig } from "react-native-reanimated/src/reanimated2/animation/springUtils";

import { KeyboardAvoidingView } from "@app/core/components/Keyboard";
import useRecording from "@app/core/hooks/useRecording";
import { t } from "@lingui/macro";
import { Button, Center, useToast } from "@madeja-studio/telar";
import { ContainerProps } from "@madeja-studio/telar/lib/typescript/src/component/Button/Container";
import * as Haptics from "expo-haptics";
import { forwardRef, useCallback, useRef } from "react";
import { Image, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { RecordingEffect, RecordingEffectRef } from "./RecordingEffect";

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

interface Props {}

export const RecordVoiceMemo = (_props: Props) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const effectRef = useRef<RecordingEffectRef>(null);
  const {
    hasGrantedPermission,
    recording,
    requestPermission,
    startRecording,
    stopRecording,
    volume,
  } = useRecording();
  const { showToast } = useToast();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const onPressIn = useCallback(async () => {
    const hasPermission = await hasGrantedPermission();

    if (hasPermission) {
      await Haptics.impactAsync();
      scale.value = withSpring(2, ANIMATION_CONFIG);
      rotation.value = withSpring(5, {
        ...ANIMATION_CONFIG,
        duration: 200,
      });
      effectRef.current?.start();

      const result = await startRecording();
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
  }, []);

  const onPressOut = useCallback(async () => {
    scale.value = withSpring(1, ANIMATION_CONFIG);
    rotation.value = withSpring(0, {
      ...ANIMATION_CONFIG,
      duration: 400,
    });
    effectRef.current?.stop();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw.style(`absolute right-4 top-[100px] bg-white dark:bg-ash`)}
    >
      <AnimatedButtonContainer
        hasHapticFeedback
        onPress={() => {}}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[animatedStyle]}
      >
        <Center
          style={tw.style(
            `h-[44px] w-[44px] mx-2 rounded-4 bg-primary relative`
          )}
        >
          <Image
            resizeMode="contain"
            source={require("@assets/icons/mic.png")}
            style={tw.style(`h-[20px] w-[20px] z-10`)}
          />

          <RecordingEffect ref={effectRef} />
        </Center>
      </AnimatedButtonContainer>
    </KeyboardAvoidingView>
  );
};
