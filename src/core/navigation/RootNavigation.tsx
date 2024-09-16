import { ProjectsScreen } from "@app/features/projects";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootNavigationParamList } from "./routes";

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={ProjectsScreen} name="projects" />
    </Stack.Navigator>
  );
};

export default RootNavigation;
