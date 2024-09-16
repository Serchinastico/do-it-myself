import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigationParamList = {
  placeholder: undefined;
};

type RootNavigationScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  "placeholder"
>["navigation"];

export const useRootNavigation = useNavigation<RootNavigationScreenProps>;
