import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { Button, Column, Row, VectorIcon } from "@madeja-studio/telar";
import { animated } from "@react-spring/native";
import { PropsWithChildren } from "react";
import { Text, ViewProps } from "react-native";

import { useHeaderAnimation } from "./useHeaderAnimation";

type Props = {
  subtitle?: string;
  title: string;
} & BackProps &
  PropsWithChildren<ViewProps>;

type BackProps =
  | {
      hasBackButton: true;
      onBackPress: () => Promise<void> | void;
    }
  | { hasBackButton?: false };

export const Header = ({ children, subtitle, title, ...props }: Props) => {
  const { animatedStyle, subtitle: subtitleText } = useHeaderAnimation({
    subtitle,
  });
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const colorSwitch = useColorSwitch();

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
              hasHapticFeedback={isHapticFeedbackEnabled}
              onPress={props.onBackPress}
              style={tw`center android:mt-1 ios:mt-0.5 size-press`}
            >
              <VectorIcon
                color={colorSwitch({ dark: "white", light: "ash" })}
                icon={{ family: "Feather", name: "chevron-left" }}
                size={36}
              />
            </Button.Container>
          )}

          <Row style={tw`items-baseline`}>
            <Text style={tw`h1`}>{title}</Text>
            <animated.Text
              style={[tw`button text-primary ml-2 italic`, animatedStyle]}
            >
              {subtitleText}
            </animated.Text>
          </Row>
        </Row>

        <Row>{children}</Row>
      </Row>
    </Column>
  );
};
