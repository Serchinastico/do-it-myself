import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { RootScreenProps } from "@app/core/navigation/routes";
import { color } from "@app/core/theme/color";
import { SafeAreaView } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform } from "react-native";

import { ToolHeader } from "./components/headers";

export const ManualScreen = ({ navigation }: RootScreenProps<"manual">) => {
  const editor = useEditorBridge({
    autofocus: true,
    // avoidIosKeyboard: true,
    initialContent: "Start editing!",
  });

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Manual
        onBackPress={() => navigation.goBack()}
        onEditPress={() => {}}
        onExportPress={() => {}}
      />

      <RichText containerStyle={tw`px-4`} editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
