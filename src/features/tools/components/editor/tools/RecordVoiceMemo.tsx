import type { SpringConfig } from "react-native-reanimated/src/reanimated2/animation/springUtils";

import { KeyboardAvoidingView } from "@app/core/components/Keyboard";
import { Button, Center } from "@madeja-studio/telar";
import * as Haptics from "expo-haptics";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Image, Platform } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedButtonContainer = Animated.createAnimatedComponent(
  forwardRef(Button.Container)
);

const ANIMATION_CONFIG: SpringConfig = {
  dampingRatio: 0.5,
  duration: 250,
  stiffness: 50,
};

interface Props {}

export interface RecordingEffectRef {
  start: () => void;
  stop: () => void;
}

interface RecordingEffectProps {
  animationDelay?: number;
  scale: number;
  startingRotation?: number;
}

const RecordingEffect = forwardRef<RecordingEffectRef, RecordingEffectProps>(
  ({ animationDelay, scale, startingRotation }, ref) => {
    const rotation = useSharedValue(startingRotation ?? 0);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ rotate: `${rotation.value}deg` }, { scale }],
    }));

    useImperativeHandle(ref, () => ({
      start: () => {
        opacity.value = withTiming(0.25, { duration: 400 });
        rotation.value = withDelay(
          animationDelay ?? 0,
          withRepeat(
            withTiming((startingRotation ?? 0) + 90, {
              duration: 1000,
              easing: Easing.linear,
            }),
            -1
          )
        );
      },
      stop: () => {
        opacity.value = withTiming(0, { duration: 200 });
        rotation.value = startingRotation ?? 0;
      },
    }));

    return (
      <Animated.View
        style={[tw`absolute inset-0, bg-primary rounded-4`, animatedStyle]}
      />
    );
  }
);

export const RecordVoiceMemo = (props: Props) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const effectRefs = useRef<RecordingEffectRef[]>([]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw.style(`absolute right-4 top-[100px] bg-white dark:bg-ash`)}
    >
      <AnimatedButtonContainer
        hasHapticFeedback
        onPress={() => {}}
        onPressIn={async () => {
          await Haptics.impactAsync();
          scale.value = withSpring(2, ANIMATION_CONFIG);
          rotation.value = withSpring(5, {
            ...ANIMATION_CONFIG,
            duration: 200,
          });
          effectRefs.current.forEach((ref) => ref.start());
        }}
        onPressOut={() => {
          scale.value = withSpring(1, ANIMATION_CONFIG);
          rotation.value = withSpring(0, {
            ...ANIMATION_CONFIG,
            duration: 400,
          });
          effectRefs.current.forEach((ref) => ref.stop());
        }}
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

          <RecordingEffect
            ref={(el) => (effectRefs.current[0] = el!)}
            scale={1.05}
            startingRotation={30}
          />
          <RecordingEffect
            ref={(el) => (effectRefs.current[1] = el!)}
            scale={1}
          />
          <RecordingEffect
            ref={(el) => (effectRefs.current[2] = el!)}
            scale={1.1}
            startingRotation={45}
          />
        </Center>
      </AnimatedButtonContainer>
    </KeyboardAvoidingView>
  );
};
