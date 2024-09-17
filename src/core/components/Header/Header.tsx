import { Column, Row } from "@madeja-studio/telar";
import { PropsWithChildren } from "react";
import { Text, ViewProps } from "react-native";

interface Props extends PropsWithChildren<ViewProps> {
  title: string;
}

export const Header = ({ children, title, ...props }: Props) => {
  return (
    <Column {...props}>
      <Row style={tw`items-center justify-between px-4 pt-2 pb-4`}>
        <Text style={tw`font-black text-h1`}>{title}</Text>

        <Row>{children}</Row>
      </Row>
    </Column>
  );
};
