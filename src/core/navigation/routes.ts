import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigationParamList = {
  addTags: undefined;
  createProject: undefined;
  editProject: { projectId: string };
  manual: { projectId: string };
  projects: undefined;
};

type RootNavigationScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  "projects"
>["navigation"];

export const useRootNavigation = useNavigation<RootNavigationScreenProps>;

export type RootScreenProps<TRoute extends keyof RootNavigationParamList> =
  ScreenProps<RootNavigationParamList, TRoute>;

export type ScreenProps<
  TParamList extends Record<string, any>,
  TRoute extends keyof TParamList,
> = NativeStackScreenProps<TParamList, TRoute>;
