import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";
import { TenTapStartKit } from "@10play/tentap-editor/src/bridges/StarterKit";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { getProjectColorById } from "@app/domain/project";
import { editorHtml } from "@app/editor-web/build/editorHtml";
import { TitleBridge } from "@app/editor-web/extensions/TitleBridge";
import { SafeAreaView } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { ToolHeader } from "./components/headers";

export const ManualScreen = ({
  navigation,
  route,
}: RootScreenProps<"manual">) => {
  const [isEditing, setIsEditing] = useState(false);
  const { projectId } = route.params;
  const project = useAtomValue(derivedAtoms.projectAtomFamily(projectId));

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      ...TenTapStartKit,
      TitleBridge.configureExtension({
        backgroundColor: getProjectColorById(project.colorId).hex,
      }),
    ],
    customSource: editorHtml,
    dynamicHeight: true,
    editable: isEditing,
    initialContent:
      "<title>Start editing!</title><p>aiushd uasi gduas dgua dis adiasud aiusdh ausidh uais dhaisu dhaisu</p>",
    theme: {
      toolbar: {
        icon: { height: 20, tintColor: color.secondary, width: 20 },
        toolbarBody: {
          backgroundColor: color.white,
          height: 48,
        },
      },
    },
  });
  const html = useEditorContent(editor, { type: "html" });

  console.log(html);

  useEffect(() => {
    if (isEditing) {
      editor.focus("end");
    }
  }, [isEditing]);

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
        containerStyle={tw`px-4`}
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
        <Toolbar
          editor={editor}
          items={[
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/header.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/list.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/equation.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/bold.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/italic.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/underline.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/link.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/image.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/mic.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/undo.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/redo.png"),
              onPress: () => () => {},
            },
          ]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
