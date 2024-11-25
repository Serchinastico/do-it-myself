import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { Button, VectorIcon } from "@madeja-studio/telar";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children: ReactNode;
  childrenHeight: number;
  fieldName: string;
  selectedValue: string;
}

export interface AccordionRef {
  close: () => void;
  open: () => void;
}

export const Accordion = forwardRef<AccordionRef, Props>(
  ({ children, childrenHeight, fieldName, selectedValue }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isHapticFeedbackEnabled } = useHapticFeedback();
    const colorSwitch = useColorSwitch();

    const valuePickerHeight = useSharedValue(64);
    const valuePickerOpacity = useSharedValue(0);

    const accordionAnimationStyle = useAnimatedStyle(() => ({
      height: withSpring(valuePickerHeight.value, {
        dampingRatio: 0.55,
        duration: 500,
      }),
    }));

    const childrenAnimationStyle = useAnimatedStyle(() => ({
      opacity: withTiming(valuePickerOpacity.value, {
        duration: 200,
        easing: Easing.cubic,
      }),
    }));

    useEffect(() => {
      valuePickerHeight.value = isOpen ? 52 + childrenHeight : 52;
      valuePickerOpacity.value = isOpen ? 1 : 0;
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
      close: () => setIsOpen(false),
      open: () => setIsOpen(true),
    }));

    return (
      <Button.Container
        hasHapticFeedback={isHapticFeedbackEnabled}
        onPress={() => setIsOpen((v) => !v)}
        style={tw``}
      >
        <Animated.View style={[tw`mt-2 w-full px-2`, accordionAnimationStyle]}>
          <View style={tw`w-full flex-row center`}>
            <Text style={tw`flex-1 h3`}>{fieldName}</Text>
            <Text style={tw`body`}>{selectedValue}</Text>
            <VectorIcon
              color={colorSwitch({ dark: "white", light: "ash" })}
              icon={{
                family: "Feather",
                name: isOpen ? "chevron-up" : "chevron-down",
              }}
              size={24}
              style={tw`p-2`}
            />
          </View>

          <Animated.View
            style={[tw`flex-1 overflow-hidden mt-4`, childrenAnimationStyle]}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </Button.Container>
    );
  }
);
