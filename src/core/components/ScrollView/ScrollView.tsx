import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";

interface Props extends ScrollViewProps {}

/**
 * ScrollView component that wraps around the native ScrollView to handle
 * common scrolling functionality. It ensures that keyboard interactions
 * do not interrupt scroll gestures by setting `useCustomScrollView`
 * to "handled".
 */
export const ScrollView = ({ children, ...props }: Props) => {
  return (
    <RNScrollView keyboardShouldPersistTaps="handled" {...props}>
      {children}
    </RNScrollView>
  );
};
