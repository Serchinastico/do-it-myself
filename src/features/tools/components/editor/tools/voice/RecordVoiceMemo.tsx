import type { SpringConfig } from "react-native-reanimated/src/reanimated2/animation/springUtils";

import { KeyboardAvoidingView } from "@app/core/components/Keyboard";
import { Button, Center } from "@madeja-studio/telar";
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
  forwardRef(Button.Container)
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const onPressIn = useCallback(async () => {
    await Haptics.impactAsync();
    scale.value = withSpring(2, ANIMATION_CONFIG);
    rotation.value = withSpring(5, {
      ...ANIMATION_CONFIG,
      duration: 200,
    });
    effectRef.current?.start();
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
