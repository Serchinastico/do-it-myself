import {
  AddTagsScreen,
  CreateProjectScreen,
  ProjectsScreen,
} from "@app/features/projects/screens";
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
        component={AddTagsScreen}
        name="addTags"
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
