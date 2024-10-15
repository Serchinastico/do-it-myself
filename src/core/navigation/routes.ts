import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigationParamList = {
  addTags: undefined;
  appPurchased: undefined;
  attachments: { projectId: string };
  createProject: undefined;
  editProject: { projectId: string };
  imageViewer: { imagePaths: string[]; initialImageIndex: number };
  manual: { projectId: string };
  projects: undefined;
  purchase: undefined;
  settings: undefined;
  worklog: { projectId: string };
};

type RootNavigationScreenProps = NativeStackScreenProps<
  RootNavigationParamList,
  "projects"
>["navigation"];

export const useRootNavigation = useNavigation<RootNavigationScreenProps>;
export type RootNavigation = ReturnType<typeof useRootNavigation>;

export type RootScreenProps<TRoute extends keyof RootNavigationParamList> =
  ScreenProps<RootNavigationParamList, TRoute>;

export type ScreenProps<
  TParamList extends Record<string, any>,
  TRoute extends keyof TParamList,
> = NativeStackScreenProps<TParamList, TRoute>;
