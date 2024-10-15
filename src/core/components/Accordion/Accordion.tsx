import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { Button, VectorIcon } from "@madeja-studio/telar";
import {
  ReactNode,
  forwardRef,
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
    const colorSwitch = useColorSwitch();

    const dateTimePickerHeight = useSharedValue(64);
    const dateTimePickerOpacity = useSharedValue(0);

    const accordionAnimationStyle = useAnimatedStyle(() => ({
      height: withSpring(dateTimePickerHeight.value, {
        dampingRatio: 0.55,
        duration: 500,
      }),
    }));

    const childrenAnimationStyle = useAnimatedStyle(() => ({
      opacity: withTiming(dateTimePickerOpacity.value, {
        duration: 200,
        easing: Easing.cubic,
      }),
    }));

    useEffect(() => {
      dateTimePickerHeight.value = isOpen ? 64 + childrenHeight : 64;
      dateTimePickerOpacity.value = isOpen ? 1 : 0;
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
      close: () => setIsOpen(false),
      open: () => setIsOpen(true),
    }));

    return (
      <Button.Container hasHapticFeedback onPress={() => setIsOpen((v) => !v)}>
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
