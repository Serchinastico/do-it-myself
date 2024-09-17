import { Column } from "@madeja-studio/telar";
import { Text, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  title: string;
}

export const Input = ({ style, title, ...props }: Props) => {
  return (
    <Column>
      <Text style={[tw`h3`, style]}>{title}</Text>
      <TextInput
        style={tw`border-b border-primary body pt-2 pb-1 my-2 ml-4`}
        {...props}
      />
    </Column>
  );
};
