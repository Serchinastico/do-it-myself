import AllProviders from "@app/core/providers/AllProviders";
import { Text, View } from "react-native";

import { bootstrap } from "./bootstrap";

bootstrap();

export default function App() {
  return (
    <AllProviders>
      <View>
        <Text
          style={{
            alignItems: "center",
            display: "flex",
            flex: 1,
            fontSize: 20,
            fontWeight: "black",
            justifyContent: "center",
          }}
        >
          Welcome
        </Text>
      </View>
    </AllProviders>
  );
}
