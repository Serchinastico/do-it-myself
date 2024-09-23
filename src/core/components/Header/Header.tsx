import { Button, Column, Row, VectorIcon } from "@madeja-studio/telar";
import { PropsWithChildren } from "react";
import { Text, ViewProps } from "react-native";

type Props = {
  title: string;
} & BackProps &
  PropsWithChildren<ViewProps>;

type BackProps =
  | {
      hasBackButton: true;
      onBackPress: () => Promise<void> | void;
    }
  | { hasBackButton?: false };

export const Header = ({ children, title, ...props }: Props) => {
  return (
    <Column {...props}>
      <Row
        style={tw.style(`items-center justify-between pl-4 pr-4 pt-2 pb-4`, {
          "pl-1": props.hasBackButton ?? false,
        })}
      >
        <Row style={tw`center`}>
          {props.hasBackButton && (
            <Button.Container
              onPress={props.onBackPress}
              style={tw`center android:mt-1 ios:mt-0.5 size-press`}
            >
              <VectorIcon
                icon={{ family: "Feather", name: "chevron-left" }}
                size={36}
              />
            </Button.Container>
          )}

          <Text style={tw`h1`}>{title}</Text>
        </Row>

        <Row>{children}</Row>
      </Row>
    </Column>
  );
};
