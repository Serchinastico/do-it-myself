import { Center } from "@madeja-studio/telar";
import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle, ViewProps } from "react-native";

type Props = PropsWithChildren<ViewProps> & {
  isMini?: boolean;
  textStyle?: StyleProp<TextStyle>;
};

export const Cue = ({
  children,
  isMini,
  style,
  textStyle,
  ...props
}: Props) => {
  isMini = isMini ?? false;

  return (
    <Center
      style={[
        tw.style(`bg-primary px-4 py-2 skew`, {
          "rounded-1": isMini,
          "rounded-2": !isMini,
        }),
        style,
      ]}
      {...props}
    >
      <Text style={[tw`button text-white`, textStyle, tw`counter-skew`]}>
        {children}
      </Text>
    </Center>
  );
};
