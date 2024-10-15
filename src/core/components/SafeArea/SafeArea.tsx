import { SafeAreaView } from "@madeja-studio/telar";
import { PropsWithChildren } from "react";
import { SafeAreaViewProps } from "react-native-safe-area-context";

type Props = PropsWithChildren & SafeAreaViewProps;

export const SafeArea = ({ children, style, ...props }: Props) => {
  return (
    <SafeAreaView style={[tw`bg-white dark:bg-ash`, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};
