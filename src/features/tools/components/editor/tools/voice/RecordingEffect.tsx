import { forwardRef, useImperativeHandle, useRef } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export interface RecordingEffectRef {
  start: () => void;
  stop: () => void;
}

interface ItemProps {
  animationDelay?: number;
  scale: number;
  startingRotation?: number;
}

const Item = forwardRef<RecordingEffectRef, ItemProps>(
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

export const RecordingEffect = forwardRef<RecordingEffectRef, {}>((_, ref) => {
  const itemRefs = useRef<RecordingEffectRef[]>([]);

  useImperativeHandle(ref, () => ({
    start: () => {
      itemRefs.current.forEach((item) => item.start());
    },
    stop: () => {
      itemRefs.current.forEach((item) => item.stop());
    },
  }));

  return (
    <>
      <Item
        ref={(el) => (itemRefs.current[0] = el!)}
        scale={1.05}
        startingRotation={30}
      />
      <Item ref={(el) => (itemRefs.current[1] = el!)} scale={1} />
      <Item
        ref={(el) => (itemRefs.current[2] = el!)}
        scale={1.1}
        startingRotation={45}
      />
    </>
  );
});
