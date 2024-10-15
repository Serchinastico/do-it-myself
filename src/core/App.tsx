// eslint-disable-next-line import/order
import { bootstrap } from "./bootstrap";

// eslint-disable-next-line perfectionist/sort-imports
import RootNavigation from "@app/core/navigation/RootNavigation";
import AllProviders from "@app/core/providers/AllProviders";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

bootstrap();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <AllProviders>
      <RootNavigation />

      <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
    </AllProviders>
  );
}
