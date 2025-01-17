import {
  createNavigationContainerRef,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack/src/types";

export type RootNavigationParamList = {
  addTags: undefined;
  appPurchased: undefined;
  assetViewer: { assetPaths: string[]; initialImageIndex: number };
  attachments: { projectId: string };
  createProject: undefined;
  editProject: { projectId: string };
  exportManual: { projectId: string };
  manual: { projectId: string };
  onboarding: undefined;
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
  TParamList extends Record<string, object | undefined>,
  TRoute extends keyof TParamList,
> = NativeStackScreenProps<TParamList, TRoute>;

export const navigationRef = createNavigationContainerRef();
export type NavigationScreenOptions = NativeStackNavigationOptions;
