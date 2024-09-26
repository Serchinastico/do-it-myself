import { RichText } from "@10play/tentap-editor";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { useEditor } from "@app/features/tools/hooks/useEditor";
import { SafeAreaView } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Toolbar } from "./components/editor/Toolbar";
import { ToolHeader } from "./components/headers";

export const ManualScreen = ({
  navigation,
  route,
}: RootScreenProps<"manual">) => {
  const [isEditing, setIsEditing] = useState(false);
  const { projectId } = route.params;
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );
  const { editor, html } = useEditor({ isEditing, project });

  useEffect(() => {
    if (isEditing) {
      editor.focus("end");
    }
  }, [isEditing]);

  useEffect(() => {
    if (!html) return;

    setProject({ manual: { html } });
  }, [html]);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Manual
        isEditing={isEditing}
        onBackPress={() => navigation.goBack()}
        onEditPress={() => setIsEditing((isEditing) => !isEditing)}
        onExportPress={() => {}}
      />

      <RichText
        containerStyle={tw`px-4 pt-4`}
        editor={editor}
        focusable={isEditing}
        scrollEnabled
      />

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
