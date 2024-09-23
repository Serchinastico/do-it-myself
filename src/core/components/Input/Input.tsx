import { color } from "@app/core/theme/color";
import { Column } from "@madeja-studio/telar";
import { forwardRef } from "react";
import { Text, TextInput, TextInputProps } from "react-native";

type Props = {
  title: string;
} & ErrorProps &
  TextInputProps;

type ErrorProps =
  | {
      errorMessage: string;
      hasError: true;
    }
  | {
      hasError?: false;
    };

export const Input = forwardRef<TextInput, Props>(
  ({ style, title, ...props }, ref) => {
    return (
      <Column>
        <Text style={[tw`h3`, style]}>{title}</Text>
        <TextInput
          ref={ref}
          style={tw.style(`border-b border-primary body pt-2 pb-1 my-2 ml-4`, {
            borderColor: props.hasError ? color.error : color.secondary,
          })}
          {...props}
        />

        {props.hasError && (
          <Text style={tw`ml-4 body error`}>{props.errorMessage}</Text>
        )}
      </Column>
    );
  }
);
