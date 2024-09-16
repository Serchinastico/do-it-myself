import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigationParamList = {
  projects: undefined;
};

type RootNavigationScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  "projects"
>["navigation"];

export const useRootNavigation = useNavigation<RootNavigationScreenProps>;
