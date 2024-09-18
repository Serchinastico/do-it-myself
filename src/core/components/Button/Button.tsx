import { t } from "@lingui/macro";
import { Button as TelarButton } from "@madeja-studio/telar";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof TelarButton>;

export const Button = ({ rowStyle, style, textStyle, ...props }: Props) => {
  return (
    <TelarButton
      hasHapticFeedback
      rowStyle={[tw`flex-row-reverse rounded-full py-3`, rowStyle]}
      style={[tw`center`, style]}
      text={t`Create new project`}
      textStyle={[tw`normal-case mx-2 button`, textStyle]}
      {...props}
    />
  );
};
