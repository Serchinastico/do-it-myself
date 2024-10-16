import { Center } from "@madeja-studio/telar";
import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle, ViewProps } from "react-native";

type Props = {
  textStyle?: StyleProp<TextStyle>;
} & PropsWithChildren<ViewProps>;

export const Cue = ({ children, style, textStyle, ...props }: Props) => {
  return (
    <Center style={[tw`bg-primary px-4 py-2 rounded-2 skew`, style]} {...props}>
      <Text style={[tw`button`, textStyle, tw`text-white counter-skew`]}>
        {children}
      </Text>
    </Center>
  );
};
