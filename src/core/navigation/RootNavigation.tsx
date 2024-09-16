import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import { RootNavigationParamList } from "./routes";

const Stack = createNativeStackNavigator<RootNavigationParamList>();

const PlaceholderScreen = () => {
  return (
    <View
      style={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        fontSize: 20,
        fontWeight: "black",
        justifyContent: "center",
      }}
    >
      <Text>Navigation</Text>
    </View>
  );
};

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={PlaceholderScreen} name="placeholder" />
    </Stack.Navigator>
  );
};

export default RootNavigation;
