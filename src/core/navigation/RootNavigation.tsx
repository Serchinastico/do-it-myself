import { ImageViewerScreen } from "@app/features/image-viewer/screens/ImageViewerScreen";
import {
  AddTagsScreen,
  CreateProjectScreen,
  EditProjectScreen,
  ProjectsScreen,
} from "@app/features/projects/screens";
import { PurchaseScreen, SettingsScreen } from "@app/features/settings/screens";
import { AttachmentsScreen } from "@app/features/tools/screens/AttachmentsScreen";
import { ManualScreen } from "@app/features/tools/screens/ManualScreen";
import { WorklogScreen } from "@app/features/tools/screens/WorklogScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootNavigationParamList } from "./routes";

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={ProjectsScreen} name="projects" />
      <Stack.Screen component={SettingsScreen} name="settings" />
      <Stack.Screen
        component={PurchaseScreen}
        name="purchase"
        options={{ presentation: "modal" }}
      />
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
      <Stack.Screen component={WorklogScreen} name="worklog" />
      <Stack.Screen component={AttachmentsScreen} name="attachments" />
      <Stack.Screen
        component={ImageViewerScreen}
        name="imageViewer"
        options={{
          animationDuration: 200,
          gestureDirection: "vertical",
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
