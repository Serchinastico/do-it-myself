import { ImageViewerScreen } from "@app/features/image-viewer/ImageViewerScreen";
import {
  AddTagsScreen,
  CreateProjectScreen,
  EditProjectScreen,
  ProjectsScreen,
} from "@app/features/projects/screens";
import { ManualScreen } from "@app/features/tools/ManualScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootNavigationParamList } from "./routes";

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={ProjectsScreen} name="projects" />
      <Stack.Screen
        component={CreateProjectScreen}
        name="createProject"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        component={EditProjectScreen}
        name="editProject"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        component={AddTagsScreen}
        name="addTags"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen component={ManualScreen} name="manual" />
      <Stack.Screen component={ImageViewerScreen} name="imageViewer" />
    </Stack.Navigator>
  );
};

export default RootNavigation;
