import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingViewProps,
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
} from "react-native";

type Props = KeyboardAvoidingViewProps & PropsWithChildren;

export const KeyboardAvoidingView = ({ children, style, ...props }: Props) => {
  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[tw`flex-1`, style]}
      {...props}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
};
