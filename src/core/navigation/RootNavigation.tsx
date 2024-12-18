import { atoms } from "@app/core/storage/state";
import { ImageViewerScreen } from "@app/features/image-viewer/screens/ImageViewerScreen";
import OnboardingScreen from "@app/features/onboarding/screens/OnboardingScreen";
import {
  AddTagsScreen,
  CreateProjectScreen,
  EditProjectScreen,
  ProjectsScreen,
} from "@app/features/projects/screens";
import { PurchaseScreen, SettingsScreen } from "@app/features/settings/screens";
import { AppPurchasedScreen } from "@app/features/settings/screens/AppPurchasedScreen";
import { AttachmentsScreen } from "@app/features/tools/screens/AttachmentsScreen";
import { ExportManualScreen } from "@app/features/tools/screens/ExportManualScreen";
import { ManualScreen } from "@app/features/tools/screens/ManualScreen";
import { WorklogScreen } from "@app/features/tools/screens/WorklogScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtomValue } from "jotai";

import { RootNavigationParamList } from "./routes";

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const RootNavigation = () => {
  const hasSeenOnboarding = useAtomValue(atoms.hasSeenOnboarding);

  const initialRouteName = hasSeenOnboarding ? "projects" : "onboarding";

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      key={tw.memoBuster}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={OnboardingScreen} name="onboarding" />
      <Stack.Screen component={ProjectsScreen} name="projects" />
      <Stack.Screen component={SettingsScreen} name="settings" />
      <Stack.Screen
        component={PurchaseScreen}
        name="purchase"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        component={AppPurchasedScreen}
        name="appPurchased"
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
        component={ExportManualScreen}
        name="exportManual"
        options={{ presentation: "modal" }}
      />
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
