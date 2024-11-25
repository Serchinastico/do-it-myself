import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { color } from "@app/core/theme/color";
import { Button as TelarButton } from "@madeja-studio/telar";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof TelarButton>;

export const Button = ({
  rowStyle,
  style,
  text,
  textStyle,
  ...props
}: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const colorSwitch = useColorSwitch();

  const shouldSwitchTextColor =
    (colorSwitch.colorScheme === "dark" && props.variant === "text") ||
    (colorSwitch.colorScheme === "light" &&
      ["contained", undefined].includes(props.variant));

  return (
    <TelarButton
      hasHapticFeedback={isHapticFeedbackEnabled}
      rowStyle={[tw`flex-row-reverse rounded-full py-3`, rowStyle]}
      style={[tw`center`, style]}
      text={text}
      textStyle={[
        tw`normal-case mx-2 button`,
        shouldSwitchTextColor && { color: color.white },
        textStyle,
      ]}
      {...props}
    />
  );
};
